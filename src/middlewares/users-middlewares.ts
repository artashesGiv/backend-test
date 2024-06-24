import { param } from 'express-validator'
import { Route, Users } from '@/types'
import { NextFunction, Response } from 'express'
import { usersService } from '@/domain/users-service'
import { StatusCodes } from 'http-status-codes'
import { stringValidatorGenerator } from '@/helpres'
import RequestWithParams = Route.RequestWithParams
import URIParamsUserIdModel = Users.URIParamsUserIdModel

export const userNameValidation = stringValidatorGenerator('name', 3, 15)
export const userLoginValidation = stringValidatorGenerator('login', 3, 15)
export const userPasswordValidation = stringValidatorGenerator(
  'password',
  3,
  15,
)

export const paramIdValidation = param('id')
  .isNumeric()
  .withMessage('id should be is number')

export const userIsFoundValidation = async (
  req: RequestWithParams<URIParamsUserIdModel>,
  res: Response,
  next: NextFunction,
) => {
  const user = await usersService.getUserById(+req.params.id)
  if (user) {
    next()
  } else {
    res.status(StatusCodes.NOT_FOUND).end()
  }
}
