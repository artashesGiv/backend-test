export namespace Users {
  export type User = {
    id: number
    name: string
    login: string
    password: string
  }

  export type UserViewModel = Pick<User, 'id' | 'name'>
  export type UserCreateModel = Pick<User, 'name' | 'login' | 'password'>
  export type UserUpdateModel = Pick<User, 'name'>
  export type URIParamsUserIdModel = {
    id: string
  }
}
