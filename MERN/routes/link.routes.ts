import jwt from "jsonwebtoken";
import config from "config";
import shortId from "shortid";

import Link from "../models/Link";

import { RequestHandler, Router } from "express";

export const linkRouter = Router();

const authMiddleware: RequestHandler = async (req, resp, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Barer -> TOKEN <-"

    if (!token) {
      return resp.status(401).json({ message: "Нет авторизации" });
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // @ts-expect-error
    req.user = decoded;

    next();
  } catch {
    resp.status(401).json({ message: "Нет авторизации" });
  }
};
// /api/links/generate
linkRouter.post("/generate", authMiddleware, async (req, resp) => {
  try {
    const baseUrl = config.get("baseUrl");

    const { from } = req.body;

    const code = shortId.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return resp.json({ link: existing });
    }

    const to = `${baseUrl}/t/${code}`;

    const link = new Link({
      code,
      to,
      from,
      // @ts-expect-error
      owner: req.user.userId,
    });

    await link.save();

    resp.status(201).json({ link });
  } catch (e) {
    console.log(e);

    resp.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
  }
});

// /api/links/
linkRouter.get("/all", authMiddleware, async (req, resp) => {
  try {
    // @ts-expect-error
    const links = await Link.find({ owner: req.user.userId });

    resp.json({ links });
  } catch (e) {
    resp.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
  }
});

// /api/links/:id
linkRouter.get("/:id", authMiddleware, async (req, resp) => {
  try {
    const link = await Link.findById(req.params.id);

    resp.json({ link });
  } catch (e) {
    resp.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
  }
});
