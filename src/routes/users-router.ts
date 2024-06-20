import express, { NextFunction, Response } from 'express'
import { UserViewModel } from '../models/UserViewModel'
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  User,
} from '../types'
import { URIParamsUserIdModel } from '../models/URIParamsUserIdModel'
import {
  UserCreateModel,
  UserUpdateModel,
} from '../models/UserCreateUpdateModel'
import { userRepository } from '../repositories/user-repository'
import { body, param } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'

export const userRouter = express.Router()

export const getUserViewModel = (user: User): UserViewModel => {
  return {
    id: user.id,
    name: user.name,
  }
}

// local middlewares
const userNameValidation = body('name')
  .isString()
  .isLength({ min: 3, max: 15 })
  .withMessage('name length should be from 3 to 15 symbols')
  .trim()

const paramIdValidation = param('id')
  .isNumeric()
  .withMessage('id should be is number')

const userIsFoundValidation = async (
  req: RequestWithParams<URIParamsUserIdModel>,
  res: Response,
  next: NextFunction,
) => {
  const user = await userRepository.getUserById(+req.params.id)
  if (user) {
    next()
  } else {
    res.status(StatusCodes.NOT_FOUND).end()
  }
}

// routes
userRouter.get('/', async (_, res: Response<UserViewModel[]>) => {
  const users = await userRepository.getUsers()

  res.json(users.map(getUserViewModel)).status(StatusCodes.OK).end()
})

userRouter.get(
  '/:id([0-9]+)',
  userIsFoundValidation,
  async (
    req: RequestWithParams<URIParamsUserIdModel>,
    res: Response<UserViewModel>,
  ) => {
    const user = await userRepository.getUserById(+req.params.id)

    res.json(getUserViewModel(user!)).status(StatusCodes.OK).end()
  },
)

userRouter.post(
  '/',
  userNameValidation,
  inputValidationMiddleware,
  async (
    req: RequestWithBody<UserCreateModel>,
    res: Response<UserViewModel>,
  ) => {
    const user = await userRepository.createUser(req.body)

    res.status(StatusCodes.CREATED).json(getUserViewModel(user)).end()
  },
)

userRouter.put(
  '/:id',
  paramIdValidation,
  userIsFoundValidation,
  userNameValidation,
  inputValidationMiddleware,
  async (
    req: RequestWithParamsAndBody<URIParamsUserIdModel, UserUpdateModel>,
    res: Response<UserViewModel>,
  ) => {
    await userRepository.updateUser(+req.params.id, req.body)

    res.status(StatusCodes.OK).end()
  },
)

userRouter.delete(
  '/:id',
  paramIdValidation,
  userIsFoundValidation,
  async (req: RequestWithParams<URIParamsUserIdModel>, res) => {
    const deleteUserId = await userRepository.deleteUser(+req.params.id)

    res.status(StatusCodes.OK).json(deleteUserId).end()
  },
)
