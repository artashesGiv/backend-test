import { User } from '../types'

/**
 * data of new user
 */
export type UserCreateModel = Pick<User, 'name' | 'login' | 'password'>
export type UserUpdateModel = Pick<User, 'name'>
