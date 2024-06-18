import { Request, Response } from 'express'
import { ValidationError } from 'express-validator'

export type User = {
  id: number
  name: string
}

export type RequestWithParams<T> = Request<T>
export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>

export type ResponseWithErrors<T> = Response<T | { errors: ValidationError[] }>
