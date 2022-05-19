import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";
import { Router } from "express";

import User from "../models/User";

const createToken = (userId: string) => {
  const token = jwt.sign({ userId }, config.get("jwtSecret"), {
    expiresIn: "1h",
  });

  return token;
};

const authRouter = Router();

// /api/auth/register
authRouter.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля - 6 символов").isLength({
      min: 6,
    }),
  ],
  // @ts-expect-error
  async (req, resp) => {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return resp.status(400).json({
          errors: errors.array(),
          message: "Некорректные регистрационные данные",
        });
      }

      const candidate = await User.findOne({ email });

      if (candidate) {
        return resp
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      resp.status(201).json({
        message: "Пользователь создан",
        token: createToken(user.id),
        userId: user.id,
      });
    } catch (e) {
      resp
        .status(500)
        .json({ message: "Что то пошло не так, попробуйте снова" });
    }
  }
);

// /api/auth/login
authRouter.post(
  "/login",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  // @ts-expect-error
  async (req, resp) => {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return resp.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return resp
          .status(400)
          .json({ message: "Пользователь с таким email не существует" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return resp.status(400).json({ message: "Неверный пароль" });
      }

      resp.status(200).json({ token: createToken(user.id), userId: user.id });
    } catch (e) {
      resp
        .status(500)
        .json({ message: "Что то пошло не так, попробуйте снова" });
    }
  }
);

export { authRouter };
