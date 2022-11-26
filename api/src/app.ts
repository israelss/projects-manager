import express from 'express'
import { errorMiddleware } from './middlewares'
import usersRoute from './routes/users'

const app = express()

app.use(express.json())

app.use('/users', usersRoute)

app.use(errorMiddleware.handle)

export default app
