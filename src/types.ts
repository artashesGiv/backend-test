import { Request } from 'express'

export type User = {
  id: number
  name: string
}

export type RequestWithParams<T> = Request<T>
export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>
