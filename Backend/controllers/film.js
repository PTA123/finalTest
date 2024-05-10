import Film from "../models/film.js"
import handleUpload from "../utils/cloundinary.js"
import Joi from 'joi';

export const getFilm = async (req, res) => {
    try {
        const film = await Film.find()
        return res.status(200).json({ film })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
export const createFilm = async (req, res) => {
    try {
        const { name, time, year, image, introduce } = req.body

        const createFilmSchema = Joi.object({
            name: Joi.string().required(),
            time: Joi.number().required(),
            year: Joi.number().required(),
            image: Joi.string().required(),
            introduce: Joi.string().required()
        });

        const { error } = createFilmSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await Film.create({ name, time, year, image, introduce })

        return res.status(201).json({
            result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
export const editFilm = async (req, res) => {
    try {
        const id = req.params.id

        const name = req.body.name
        const time = req.body.time
        const year = req.body.year
        const image = req.body.image
        const introduce = req.body.introduce

        const editFilmSchema = Joi.object({
            name: Joi.string().required(),
            time: Joi.number().required(),
            year: Joi.number().required(),
            image: Joi.string(),
            introduce: Joi.string().required()
        });

        if (req.file) {
            editFilmSchema.image = Joi.string().required();
        }
        const { error } = editFilmSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await handleUpload(dataURI)

        const updateFilm = await Film.findByIdAndUpdate(id, {
            name: name,
            time: time,
            year: year,
            image: result.url,
            introduce: introduce
        }, { new: true })

        return res.status(200).json({
            message: "Update thành công",
            film: updateFilm
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
export const deleteFilm = async (req, res) => {
    try {
        const deleteFilmSchema = Joi.object({
            id: Joi.string().required()
        });

        const { error } = deleteFilmSchema.validate({ id: req.params.id });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const film = await Film.deleteOne({ _id: req.params.id });
        if (film.deletedCount === 0) {
            return res.status(404).json({
                message: "Không tìm thấy phim cần xóa"
            });
        }
        return res.status(200).json({
            message: "Xóa phim thành công",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
export const searchFilms = async (req, res) => {
    try {
        const keyword = req.body.keyword || req.query.keyword;
        if (!keyword) {
            return res.status(400).json({ error: "Vui lòng cung cấp từ khóa tìm kiếm." });
        }
        const results = await Film.find({ name: { $regex: keyword, $options: "i" } });

        return res.status(200).json({ films: results });
    } catch (error) {
        return res.status(500).json({ error })
    }
};
// Sắp xếp tăng theo năm
export const sortedByYearAsc = async (req, res) => {
    try {
        const films = await Film.find().sort({ year: 1 });
        return res.status(200).json({ films });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
// Sắp xếp giảm theo năm
export const sortedByYearDesc = async (req, res) => {
    try {
        const films = await Film.find().sort({ year: -1 });
        return res.status(200).json({ films });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
export const getPagingFilm = async (req, res) => {
    try {
        const pageSize = req.query.pageSize;
        const pageIndex = req.query.pageIndex;

        const films = await Film
            .find()
            .skip(pageSize * pageIndex - pageSize)
            .limit(pageSize)

        const countFilm = await Film.countDocuments()
        const totalPage = Math.ceil(countFilm / pageSize)
        return res.status(200).json({ films, countFilm, totalPage });
    } catch (error) {
        return res.status(500).json(error);
    }
};