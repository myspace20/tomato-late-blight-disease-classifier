import Joi from "joi";

const scanParamsSchema = Joi.object({
  id:Joi.string().required().uuid()
})

const userScanParamsSchema = Joi.object({
  user_id:Joi.string().required().uuid()
})

const userScanQuery = Joi.object({
  id:Joi.string().required().uuid(),
  user_id:Joi.string().required().uuid()
})

const createScanSchema = Joi.object({
  user_id:Joi.string().required().uuid(),
  image_url:Joi.string().required().uri(),
  disease_class:Joi.string().required(),
  confidence_level:Joi.number().required()
})

export {
  scanParamsSchema,
  userScanQuery,
  createScanSchema,
  userScanParamsSchema
}