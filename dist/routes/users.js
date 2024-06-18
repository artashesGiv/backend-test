'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getUserViewModel = exports.userRouter = void 0
const express_1 = __importDefault(require('express'))
const types_1 = require('../types')
const db_1 = require('../db/db')
exports.userRouter = express_1.default.Router()
const getUserViewModel = user => {
  return {
    id: user.id,
    name: user.name,
  }
}
exports.getUserViewModel = getUserViewModel
exports.userRouter.get('/', (_, res) => {
  res.json(db_1.db.users.map(exports.getUserViewModel))
  res.status(types_1.StatusCodes.OK)
  res.end()
})
exports.userRouter.get('/:id([0-9]+)', (req, res) => {
  if (req.params.id) {
    const user = db_1.db.users.find(user => user.id === Number(req.params.id))
    if (user) {
      res.json({
        id: user.id,
        name: user.name,
      })
      res.status(types_1.StatusCodes.OK)
    } else {
      res.status(types_1.StatusCodes.NOT_FOUND)
    }
  } else {
    res.status(types_1.StatusCodes.BAD_REQUEST)
  }
  res.end()
})
exports.userRouter.post('/', (req, res) => {
  const user = req.body
  if (user.name) {
    const newUser = {
      id: +new Date(),
      name: user.name,
    }
    db_1.db.users.push(newUser)
    res.status(types_1.StatusCodes.CREATED)
    res.json((0, exports.getUserViewModel)(newUser))
  } else {
    res.status(types_1.StatusCodes.BAD_REQUEST)
  }
  res.end()
})
exports.userRouter.delete('/:id', (req, res) => {
  if (req.params.id) {
    const user = db_1.db.users.find(user => user.id === Number(req.params.id))
    if (user) {
      db_1.db.users.splice(db_1.db.users.indexOf(user), 1)
      res.status(types_1.StatusCodes.OK)
    } else {
      res.status(types_1.StatusCodes.NOT_FOUND)
    }
  } else {
    res.status(types_1.StatusCodes.BAD_REQUEST)
  }
  res.end()
})
exports.userRouter.put('/:id', (req, res) => {
  if (req.params.id) {
    const user = db_1.db.users.find(user => user.id === +req.params.id)
    if (user) {
      user.name = req.body.name
      res.status(types_1.StatusCodes.OK)
      res.json((0, exports.getUserViewModel)(user))
    } else {
      res.status(types_1.StatusCodes.NOT_FOUND)
    }
  } else {
    res.status(types_1.StatusCodes.BAD_REQUEST)
  }
  res.end()
})
