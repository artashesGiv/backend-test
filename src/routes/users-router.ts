import express, { Response } from 'express'
import { UserViewModel } from '../models/UserViewModel'
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  User,
} from '../types'
import { URIParamsUserIdModel } from '../models/URIParamsUserIdModel'
import { UserCreateUpdateModel } from '../models/UserCreateUpdateModel'
import { db } from '../db/db'
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

userRouter.get('/', (_, res: Response<UserViewModel[]>) => {
  res
    .json(userRepository.getUsers().map(getUserViewModel))
    .status(StatusCodes.OK)
    .end()
})

userRouter.get(
  '/:id([0-9]+)',
  (
    req: RequestWithParams<URIParamsUserIdModel>,
    res: Response<UserViewModel>,
  ) => {
    const user = userRepository.getUserById(+req.params.id)

    if (user) {
      res.json({
        id: user.id,
        name: user.name,
      })
      res.status(StatusCodes.OK)
    } else {
      res.status(StatusCodes.NOT_FOUND)
    }

    res.end()
  },
)

userRouter.post(
  '/',
  userNameValidation,
  inputValidationMiddleware,
  (
    req: RequestWithBody<UserCreateUpdateModel>,
    res: Response<UserViewModel>,
  ) => {
    const user = userRepository.createUser(req.body)
    if (user) {
      res.status(StatusCodes.CREATED).json(getUserViewModel(user))
    } else {
      res.status(StatusCodes.BAD_REQUEST)
    }
    res.end()
  },
)

userRouter.put(
  '/:id',
  paramIdValidation,
  userNameValidation,
  inputValidationMiddleware,
  (
    req: RequestWithParamsAndBody<URIParamsUserIdModel, UserCreateUpdateModel>,
    res: Response<UserViewModel>,
  ) => {
    const user = db.users.find(user => user.id === +req.params.id)

    if (user) {
      user.name = req.body.name
      res.status(StatusCodes.OK)
      res.json(getUserViewModel(user))
    } else {
      res.status(StatusCodes.NOT_FOUND)
    }

    res.end()
  },
)

userRouter.delete(
  '/:id',
  paramIdValidation,
  (req: RequestWithParams<URIParamsUserIdModel>, res) => {
    if (req.params.id) {
      const user = db.users.find(user => user.id === Number(req.params.id))
      if (user) {
        db.users.splice(db.users.indexOf(user), 1)
        res.status(StatusCodes.OK)
      } else {
        res.status(StatusCodes.NOT_FOUND)
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST)
    }
    res.end()
  },
)
