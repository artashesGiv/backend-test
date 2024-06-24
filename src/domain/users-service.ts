import { usersRepository } from '@/repositories'
import { Users } from '@/types'
import User = Users.User
import UserViewModel = Users.UserViewModel
import UserCreateModel = Users.UserCreateModel
import UserUpdateModel = Users.UserUpdateModel

const getUserViewModel = (user: User): UserViewModel => {
  return {
    id: user.id,
    name: user.name,
  }
}

export const usersService = {
  async getUsers() {
    const users = await usersRepository.getUsers()

    return users.map(getUserViewModel)
  },

  async getUserById(id: User['id']) {
    const user = await usersRepository.getUserById(id)

    return getUserViewModel(user!)
  },

  async createUser(user: UserCreateModel) {
    const newUser: User = {
      id: +new Date(),
      name: user.name,
      login: user.login,
      password: user.password,
    }

    const createdUser = await usersRepository.createUser(newUser)

    return getUserViewModel(createdUser)
  },

  async updateUser(id: User['id'], user: UserUpdateModel) {
    return await usersRepository.updateUser(id, user)
  },

  async deleteUser(id: User['id']) {
    return await usersRepository.deleteUser(id)
  },
}
