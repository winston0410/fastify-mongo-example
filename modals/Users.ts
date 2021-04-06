import { WithId, ObjectId } from 'mongodb'

export default interface User {
  username: string,
  password: string
}

export type UserWithId = WithId<User>
