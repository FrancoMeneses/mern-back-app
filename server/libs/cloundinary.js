import { v2 as cloudinary } from 'cloudinary'
import { CLOUDNAME, API_KEY, API_SECRET } from '../config.js'

cloudinary.config({
    cloud_name: CLOUDNAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath,{
        folder: 'blog'
    })
}

export const deleteImage = async publicId => {
    return await cloudinary.uploader.destroy(publicId)
}