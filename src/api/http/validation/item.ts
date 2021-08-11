import Joi from 'joi'
import { ItemProps } from '../../../domains';

const schema = Joi.object({
  id: Joi.string().alphanum().min(3).max(30),
  title: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().positive().required(),
})

export const validateCreateItem = (
  body: Record<string, unknown>,
): ItemProps => {
  const validation = schema.validate(body)

  if (validation.error) {
    throw validation.error
  }

  return validation.value as ItemProps
}
