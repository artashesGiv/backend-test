import { body } from 'express-validator'

export const stringValidatorGenerator = (
  field: string,
  minLength: number,
  maxLength: number,
) => {
  return body(field)
    .isString()
    .withMessage(`${field} should be is string`)
    .isLength({ min: minLength, max: maxLength })
    .withMessage(
      `${field} length should be from ${minLength} to ${maxLength} symbols`,
    )
    .trim()
}
