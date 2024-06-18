import { User } from '../types'

export type Db = {
  users: User[]
}

export const db: Db = {
  users: [
    {
      id: 1,
      name: 'Art',
    },
    {
      id: 2,
      name: 'David',
    },
    {
      id: 3,
      name: 'Maxim',
    },
    {
      id: 4,
      name: 'Karina',
    },
    {
      id: 5,
      name: 'Marina',
    },
  ],
}
