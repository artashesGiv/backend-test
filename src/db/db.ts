import { MongoClient } from 'mongodb'
import { User } from '../types'

const mongoUri = process.env.mongoURI || 'mongodb://localhost:27017'

export const client = new MongoClient(mongoUri)

export const runDb = async () => {
  try {
    await client.connect()
    console.log('Connected successfully to bd')
  } catch (e) {
    console.error(e)
    await client.close()
  }
}

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
