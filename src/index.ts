import 'module-alias/register.js'
import { app } from './app'
import { runDb } from '@/db'

const port = process.env.PORT || 3003

const startApp = async () => {
  await runDb()
  app.listen(port, () => {
    console.log(`Сервер запущен на порту http://localhost:${port}`)
  })
}

startApp().then()
