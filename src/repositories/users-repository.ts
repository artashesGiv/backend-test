import { collections } from '@/db'
import { Users } from '@/types'
import User = Users.User
import UserUpdateModel = Users.UserUpdateModel

const { usersCollection } = collections

export const usersRepository = {
  async getUsers() {
    return usersCollection.find({}).toArray()
  },

  async getUserById(id: User['id']) {
    return usersCollection.findOne({ id })
  },

  async createUser(user: User) {
    await usersCollection.insertOne(user)
    return user
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
