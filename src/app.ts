import express from 'express'
import bodyParser from 'body-parser'
import { userRouter } from '@/routes'

export const app = express()

app.use(bodyParser.json())
app.use('/api/users', userRouter)

app.get('/', (_, res) => {
  res.send('Hello server!')
  res.end()
})
