import { db } from '../db/db'
import {
  UserCreateModel,
  UserUpdateModel,
} from '../models/UserCreateUpdateModel'
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

  createUser(user: UserCreateModel) {
    const newUser: User = {
      id: +new Date(),
      name: user.name,
      login: user.login,
      password: user.password,
    }
    db.users.push(newUser)
    return newUser
  },

  updateUser(id: number, user: UserUpdateModel) {
    const userToUpdate = db.users.find(user => user.id === id)!

    Object.entries(user).forEach(([key, value]) => {
      switch (key as keyof UserUpdateModel) {
        case 'name':
          userToUpdate.name = value
          break
        default:
          break
      }
    })

    return userToUpdate
  },

  deleteUser(id: number) {
    const user = db.users.find(user => user.id === id)!
    const deletedId = user.id

    db.users.splice(db.users.indexOf(user), 1)
    return deletedId
  },
}
