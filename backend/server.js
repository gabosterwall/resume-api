const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/resume', require('./routes/resumeRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/messages', require('./routes/messageRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))