import { RequestHandler, Router } from "express";
import Link from "../models/Link";

export const redirectRouter = Router();

redirectRouter.get("/:code", async (req, resp) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      ++link.clicks;
      link.save();
      return resp.redirect(link.from);
    }

    resp.status(404).json({ message: "Ссылка не найдена" });
  } catch {
    resp.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
  }
});
