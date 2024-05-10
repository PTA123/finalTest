import express from "express";
import userRouter from "./user.js"
import filmRouter from "./film.js"
const router = express.Router()
router.use("/user", userRouter)
router.use("/film", filmRouter)

export default router