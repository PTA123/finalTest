import mongoose from "mongoose"

const Film = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    introduce: {
        type: String,
        require: true
    }

}, { timestamps: true });
export default mongoose.model("films", Film)