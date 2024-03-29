import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
const port = process.env.PORT || 5000
const url = process.env.URL
import userRoutes from './routes/userRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'

const file  = fs.readFileSync('backend/openapi.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

const options = {
    customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .wrapper { max-width: 100%; overflow-x: hidden; }
        
        @media (max-width: 768px) {
            .swagger-ui .wrapper { font-size: 14px; padding: 10px; }
        }
    `
};

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(`/resume`, resumeRoutes)
app.use(`/users`, userRoutes)
app.use(`/comments`, commentRoutes)

app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

app.get(`/`, (req, res) => res.send('Server is ready.'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on ${url}`))