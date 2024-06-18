import { db } from '../db/db'
import { UserCreateUpdateModel } from '../models/UserCreateUpdateModel'
import { User } from '../types'

export const userRepository = {
  getUsers() {
    return db.users
  },

  getUserById(id: Maybe<number>) {
    if (!id) {
      return null
    }
    return db.users.find(user => user.id === id)
  },

  createUser(user: UserCreateUpdateModel) {
    if (!user.name) {
      return null
    }

    const newUser: User = {
      id: +new Date(),
      name: user.name,
    }
    db.users.push(newUser)
    return newUser
  },
}
