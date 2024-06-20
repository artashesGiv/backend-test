import { client } from '../db/db'
import {
  UserCreateModel,
  UserUpdateModel,
} from '../models/UserCreateUpdateModel'
import { User } from '../types'

const userCollection = client.db('test').collection<User>('users')

export const userRepository = {
  async getUsers() {
    return userCollection.find({}).toArray()
  },

  async getUserById(id: User['id']) {
    return userCollection.findOne({ id })
  },

  async createUser(user: UserCreateModel) {
    const newUser: User = {
      id: +new Date(),
      name: user.name,
      login: user.login,
      password: user.password,
    }

    await userCollection.insertOne(newUser)

    return newUser
  },

  async updateUser(id: User['id'], user: UserUpdateModel) {
    const result = await userCollection.updateOne({ id }, { $set: user })

    return !!result.matchedCount
  },

  async deleteUser(id: User['id']) {
    const result = await userCollection.deleteOne({ id })

    return !!result.deletedCount
  },
}
