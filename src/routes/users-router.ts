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
import { body, validationResult } from 'express-validator'
import { STATUS_CODES } from '../STATUS_CODES'

export const userRouter = express.Router()

export const getUserViewModel = (user: User): UserViewModel => {
  return {
    id: user.id,
    name: user.name,
  }
}

userRouter.get('/', (_, res: Response<UserViewModel[]>) => {
  res
    .json(userRepository.getUsers().map(getUserViewModel))
    .status(STATUS_CODES.OK)
    .end()
})

userRouter.get(
  '/:id([0-9]+)',
  (
    req: RequestWithParams<URIParamsUserIdModel>,
    res: Response<UserViewModel>,
  ) => {
    const id = +req.params.id

    if (id) {
      const user = userRepository.getUserById(+req.params.id)

      if (user) {
        res.json({
          id: user.id,
          name: user.name,
        })
        res.status(STATUS_CODES.OK)
      } else {
        res.status(STATUS_CODES.NOT_FOUND)
      }
    } else {
      res.status(STATUS_CODES.BAD_REQUEST)
    }

    res.end()
  },
)

userRouter.post(
  '/',
  body('name').isString().isLength({ min: 3, max: 15 }).trim(),
  (
    req: RequestWithBody<UserCreateUpdateModel>,
    res: Response<UserViewModel>,
  ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return (
        res
          .status(STATUS_CODES.BAD_REQUEST)
          // @ts-ignore
          .json({ errors: errors.array() })
      )
    }

    const user = userRepository.createUser(req.body)
    if (user) {
      res.status(STATUS_CODES.CREATED).json(getUserViewModel(user))
    } else {
      res.status(STATUS_CODES.BAD_REQUEST)
    }
    res.end()
  },
)

userRouter.put(
  '/:id',
  (
    req: RequestWithParamsAndBody<URIParamsUserIdModel, UserCreateUpdateModel>,
    res: Response<UserViewModel>,
  ) => {
    if (req.params.id) {
      const user = db.users.find(user => user.id === +req.params.id)
      if (user) {
        user.name = req.body.name
        res.status(STATUS_CODES.OK)
        res.json(getUserViewModel(user))
      } else {
        res.status(STATUS_CODES.NOT_FOUND)
      }
    } else {
      res.status(STATUS_CODES.BAD_REQUEST)
    }
    res.end()
  },
)

userRouter.delete(
  '/:id',
  (req: RequestWithParams<URIParamsUserIdModel>, res) => {
    if (req.params.id) {
      const user = db.users.find(user => user.id === Number(req.params.id))
      if (user) {
        db.users.splice(db.users.indexOf(user), 1)
        res.status(STATUS_CODES.OK)
      } else {
        res.status(STATUS_CODES.NOT_FOUND)
      }
    } else {
      res.status(STATUS_CODES.BAD_REQUEST)
    }
    res.end()
  },
)
