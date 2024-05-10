import express from "express"
import { createFilm, deleteFilm, editFilm, getFilm, getPagingFilm, searchFilms, sortedByYearAsc, sortedByYearDesc } from "../controllers/film.js"
import upload from "../middlewares/upload.js"

const router = express.Router()
router.post("/create-film", createFilm)
router.put("/:id", upload.single("image"), editFilm)
router.delete("/:id", deleteFilm)
router.get("/", searchFilms)
router.get("/get-film", getFilm)
router.get("/sorted-by-year-asc", sortedByYearAsc)
router.get("/sorted-by-year-desc", sortedByYearDesc)
router.get("/get-paging-film", getPagingFilm)
export default router