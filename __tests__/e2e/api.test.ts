import request from 'supertest'
import { UserCreateUpdateModel } from '../../src/models/UserCreateUpdateModel'
import { app } from '../../src/app'

describe('users', () => {
  it('Получить все пользователей', async () => {
    await request(app).get('/api/users').expect(200)
  })
  it('Получить пользователя по id', async () => {
    await request(app).get('/api/users/1').expect(200)
  })
  it('Получить несуществующего пользователя', async () => {
    await request(app).get('/api/users/999999').expect(404)
  })
  it('Создать пользователя', async () => {
    const newData: UserCreateUpdateModel = { name: 'new' }
    await request(app).post('/api/users').send(newData).expect(201)
  })
  it('Создать пустого пользователя', async () => {
    await request(app).post('/api/users').send({}).expect(400)
  })
  it('Удалить пользователя', async () => {
    await request(app).delete('/api/users/1').expect(200)
  })
  it('should rename user by id', async () => {
    const updatedData: UserCreateUpdateModel = { name: 'new name' }
    await request(app).put('/api/users/2').send(updatedData).expect(200)
  })
})
