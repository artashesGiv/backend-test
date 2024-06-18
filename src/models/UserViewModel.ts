import { User } from '../types'

/**
 * View model for user
 */
export type UserViewModel = Pick<User, 'id' | 'name'>
