import express from 'express'
import { errorMiddleware } from './middlewares'
import projectRoute from './routes/project'
import usersRoute from './routes/users'

const app = express()

app.use(express.json())

app.use('/project', projectRoute)
app.use('/users', usersRoute)

app.use(errorMiddleware.handle)

export default app
