import Post from "../models/post.js"
import { uploadImage, deleteImage } from "../libs/cloundinary.js"
import fs from 'fs-extra'

// Funciones que se ejecutan en el router de express

// Getting posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        return res.status(500).json('Error getPosts')
    }
}

// Getting single post
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.sendStatus(404)
        return res.send(post)
    } catch (error) {
        return res.status(500).json('Error getPost')
    }
}

// Creating post
export const createPost = async (req, res) => {
    try {
        const { title, description, content, tag, author, date, updateDate } = req.body
        let image
        
        // console.log(req.body)
        // console.log(req.files)

        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            console.log(result)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        // new Post({title: title, description: description, content: content, tag: tag, author: author, image: image})
        const newPost = new Post({ title, description, content, tag, author, image, date, updateDate })
        await newPost.save()
        res.send(newPost)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error createPost')
    }
}

// Updating post
export const updatePost = async (req, res) => {
    try {
        let image
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            console.log(result)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            req.body.image = image
        }
        // else{
        //     req.body.image = null
        // }
        const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(postUpdated)
    } catch (error) {
        return res.status(500).json('Error updatePost')
    }
}

// Deleting post
export const deletePost = async (req, res) => {
    try {
        const postRemoved = await Post.findByIdAndDelete(req.params.id)
        if (!postRemoved) return res.sendStatus(404)
        if(postRemoved.image.public_id){
            await deleteImage(postRemoved.image.public_id)
        }
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json('Error deletePost')
    }
}