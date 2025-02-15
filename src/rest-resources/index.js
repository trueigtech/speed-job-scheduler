import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import i18n from '@src/libs/i18n'
import routes from '@src/rest-resources/routes'
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware'

const app = express()

app.use(helmet())

// app.use(bodyParser.json())
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // Save raw body as string
    },
  })
)

app.use(bodyParser.json())

app.use(morgan('tiny'))

app.use(i18n.init)

// CORS Configuration
const corsOptions = {
  credentials: true,
  origin: ['*', 'http://localhost:3000', 'http://localhost:8005', 'http://localhost:8080', 'http://23.22.245.215:8005'],
  methods: ['GET, POST, PUT, PATCH, DELETE']
}

app.use(cors(corsOptions))


app.use(routes)

app.use(async (req, res) => {
  res.status(404).json({ message: 'Welcome to player backend' })
})

app.use(errorHandlerMiddleware)

export default app
