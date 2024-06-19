import { User } from '../types'

export type Db = {
  users: User[]
}

export let db: Db = {
  users: [
    {
      id: 1,
      name: 'Art',
      login: 'Art',
      password: '1242',
    },
    {
      id: 2,
      name: 'David',
      login: 'Art',
      password: '1242',
    },
    {
      id: 3,
      name: 'Maxim',
      login: 'Art',
      password: '1242',
    },
    {
      id: 4,
      name: 'Karina',
      login: 'Art',
      password: '1242',
    },
    {
      id: 5,
      name: 'Marina',
      login: 'Art',
      password: '1242',
    },
  ],
}
