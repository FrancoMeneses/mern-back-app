import { connectDB } from './db.js'
import app from './app.js'

connectDB()

app.listen(4000)

console.log('App running on port 4000')