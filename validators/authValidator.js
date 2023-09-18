import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(45).required(),
  email: Joi.string().email().max(45).required(),
  password: Joi.string().min(6).max(255).required(),
  name: Joi.string().min(1).max(45).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().min(3).max(45).required(),
  password: Joi.string().min(6).max(255).required(),
});
