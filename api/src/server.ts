import dotenv from 'dotenv'
import { env } from 'process'
import server from './app'

dotenv.config()

const PORT = env['PORT'] ?? '3001'

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
