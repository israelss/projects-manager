import express from 'express'
import cors from 'cors'
import { errorMiddleware } from './middlewares'
import projectRoute from './routes/project'
import projectsRoute from './routes/projects'
import usersRoute from './routes/users'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/projects', projectsRoute)
app.use('/project', projectRoute)
app.use('/users', usersRoute)

app.use(errorMiddleware.handle)

export default app
