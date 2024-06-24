import express, { Response } from 'express'
import { usersService } from '@/domain'
import { StatusCodes } from 'http-status-codes'
import {
  inputValidationMiddleware,
  paramIdValidation,
  userIsFoundValidation,
  userLoginValidation,
  userNameValidation,
  userPasswordValidation,
} from '@/middlewares'
import { Route, Users } from '@/types'
import RequestWithParams = Route.RequestWithParams
import RequestWithBody = Route.RequestWithBody
import RequestWithParamsAndBody = Route.RequestWithParamsAndBody
import URIParamsUserIdModel = Users.URIParamsUserIdModel
import UserViewModel = Users.UserViewModel
import UserCreateModel = Users.UserCreateModel
import UserUpdateModel = Users.UserUpdateModel

export const userRouter = express.Router()

// routes
userRouter.get('/', async (_, res: Response<UserViewModel[]>) => {
  const users = await usersService.getUsers()

  res.json(users).status(StatusCodes.OK).end()
})

userRouter.get(
  '/:id([0-9]+)',
  userIsFoundValidation,
  async (
    req: RequestWithParams<URIParamsUserIdModel>,
    res: Response<UserViewModel>,
  ) => {
    const user = await usersService.getUserById(+req.params.id)

    res.json(user!).status(StatusCodes.OK).end()
  },
)

userRouter.post(
  '/',
  userNameValidation,
  userLoginValidation,
  userPasswordValidation,
  inputValidationMiddleware,
  async (
    req: RequestWithBody<UserCreateModel>,
    res: Response<UserViewModel>,
  ) => {
    const user = await usersService.createUser(req.body)

    res.status(StatusCodes.CREATED).json(user).end()
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
    await usersService.updateUser(+req.params.id, req.body)

    res.status(StatusCodes.OK).end()
  },
)

userRouter.delete(
  '/:id',
  paramIdValidation,
  userIsFoundValidation,
  async (req: RequestWithParams<URIParamsUserIdModel>, res) => {
    const deleteUserId = await usersService.deleteUser(+req.params.id)

    res.status(StatusCodes.OK).json(deleteUserId).end()
  },
)
