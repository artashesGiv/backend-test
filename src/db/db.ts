import { MongoClient } from 'mongodb'
import { Users } from '@/types'
import User = Users.User

const mongoUri = process.env.mongoURI || 'mongodb://localhost:27017'

const client = new MongoClient(mongoUri)

export const db = client.db(process.env.MAIN_DB)

export const runDb = async () => {
  try {
    await client.connect()
    console.log('Connected successfully to bd')
  } catch (e) {
    console.error(e)
    await client.close()
  }
}

export enum ALL_COLLECTIONS {
  USERS = 'users',
}

export const collections = {
  usersCollection: db.collection<User>(ALL_COLLECTIONS.USERS),
}
