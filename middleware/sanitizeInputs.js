import { body } from "express-validator";

export const sanitizeAddPost = [
  body("title").trim().escape(),
  body("content").trim().escape(),
];

export const sanitizeRegister = [
  body("username").trim().escape(),
  body("email").trim().normalizeEmail(),
  body("password").trim().escape(),
];

export const sanitizeAddComment = [body("comment").trim().escape()];
