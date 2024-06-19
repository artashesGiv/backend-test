import request from 'supertest'
import {
  UserCreateModel,
  UserUpdateModel,
} from '../../src/models/UserCreateUpdateModel'
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
    const newData: UserCreateModel = {
      name: 'new',
      login: 'new',
      password: 'new',
    }
    await request(app).post('/api/users').send(newData).expect(201)
  })
  it('Создать пустого пользователя', async () => {
    await request(app).post('/api/users').send({}).expect(400)
  })
  it('Удалить пользователя', async () => {
    await request(app).delete('/api/users/1').expect(200)
  })
  it('Изменить имя пользователя по id', async () => {
    const updatedData: UserUpdateModel = { name: 'new name' }
    await request(app).put('/api/users/2').send(updatedData).expect(200)
  })
})
