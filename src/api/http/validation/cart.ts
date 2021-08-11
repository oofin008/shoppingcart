import Joi from 'joi'

type AddToCartPayload = {
  itemId: string
  quantity: number
}
type ModifyCartPayload = {
  itemId: string
  quantity: number
}

const schema = Joi.object({
  itemId: Joi.string().alphanum().min(3).max(30).required(),
  quantity: Joi.number().positive().required(),
})

const modifySchema = Joi.object({
  itemId: Joi.string().alphanum().min(3).max(30).required(),
  quantity: Joi.number().integer().required(),
})

export const validateAddToCart = (
  body: Record<string, unknown>,
): AddToCartPayload => {
  const validation = schema.validate(body)

  if (validation.error) {
    throw validation.error
  }

  return validation.value
}

export const validateModifyCart = (
  body: Record<string, unknown>,
): ModifyCartPayload => {
  const validation = modifySchema.validate(body)

  if(validation.error) {
    throw validation.error
  }
  return validation.value
}
