import User from "../models/user.js"
import bcrypt from "bcryptjs"
import joi from "joi"
import jwt from "jsonwebtoken"

const tokenSecret = 'secret'
export const login = async (req, res) => {
    const { compareSync } = bcrypt
    try {
        const email = req.body.email
        const password = req.body.password

        const loginSchema = joi.object({
            email: joi.string().email().min(3).max(32).required().messages({
                "string.email": "Email không đúng định dạng",
                "string.min": "Tối thiếu là 3 ký tự",
                "string.max": "Tối đa là là 32 ký tự",
                "any.required": "Vui lòng nhập Email"
            }),
            password: joi.string().min(6).max(32).required().messages({
                "string.password": "Mật khẩu không đúng định dạng",
                "string.min": "Tối thiếu là 6 ký tự",
                "string.max": "Tối đa là là 32 ký tự",
                "any.required": "Vui lòng nhập password"
            }),
        })

        const validate = loginSchema.validate({ email, password })

        if (validate.error) {
            return res.status(400).json({
                error: validate.error.details[0].message
            })
        }
        const findUser = await User.findOne({ email }).lean()
        if (!findUser) {
            return res.status(401).json({
                error: "Không tìm thấy người dùng"
            })
        }

        const checkPassword = compareSync(password, findUser.password)

        if (!checkPassword) {
            return res.status(401).json({
                error: "Sai mật khẩu"
            })
        }

        const accessToken = jwt.sign({
            id: findUser._id,
        }, process.env.SECRET_KEY, { expiresIn: '1d' })

        const {
            password: userPassword,
            ...returnUser
        } = findUser

        if (findUser) {
            return res.status(200).json({
                message: "Đăng nhập thành công",
                user: returnUser,
                accessToken
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).json({ message: "Đăng xuất thành công" });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
