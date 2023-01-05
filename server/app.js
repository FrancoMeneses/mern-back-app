import express from 'express'
import postRoutes from './routes/posts.routes.js'
import fileUpload from 'express-fileupload'
import cors from 'cors'

const app = express()

// middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use(cors())

// routes
app.use(postRoutes)

export default app