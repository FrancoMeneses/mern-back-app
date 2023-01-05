import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    tag: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        requiered: true
    },
    updateDate: {
        type: String,
        requiered: false
    },
    image: {
        url: String,
        public_id: String
    }
})

export default mongoose.model('Post', postSchema)