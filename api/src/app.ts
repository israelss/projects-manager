import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (_, res) => res.status(200).json({ message: 'Success!' }))

export default app
