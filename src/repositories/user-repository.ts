import { collections } from '../db/db'
import {
  UserCreateModel,
  UserUpdateModel,
} from '../models/UserCreateUpdateModel'
import { User } from '../types'

const { users: usersCollection } = collections

export const userRepository = {
  async getUsers() {
    return usersCollection.find({}).toArray()
  },

  async getUserById(id: User['id']) {
    return usersCollection.findOne({ id })
  },

  async createUser(user: UserCreateModel) {
    const newUser: User = {
      id: +new Date(),
      name: user.name,
      login: user.login,
      password: user.password,
    }

    await usersCollection.insertOne(newUser)

    return newUser
  },

  async updateUser(id: User['id'], user: UserUpdateModel) {
    const result = await usersCollection.updateOne({ id }, { $set: user })

    return !!result.matchedCount
  },

  async deleteUser(id: User['id']) {
    const result = await usersCollection.deleteOne({ id })

    return !!result.deletedCount
  },
}
