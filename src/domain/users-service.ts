import { usersRepository } from '../repositories/users-repository'
import {
  UserCreateModel,
  UserUpdateModel,
} from '../models/UserCreateUpdateModel'
import { User } from '../types'

export const usersService = {
  async getUsers() {
    return await usersRepository.getUsers()
  },

  async getUserById(id: User['id']) {
    return await usersRepository.getUserById(id)
  },

  async createUser(user: UserCreateModel) {
    const newUser: User = {
      id: +new Date(),
      name: user.name,
      login: user.login,
      password: user.password,
    }

    return await usersRepository.createUser(newUser)
  },

  async updateUser(id: User['id'], user: UserUpdateModel) {
    return await usersRepository.updateUser(id, user)
  },

  async deleteUser(id: User['id']) {
    return await usersRepository.deleteUser(id)
  },
}
