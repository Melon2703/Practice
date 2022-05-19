import config from "config";
import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.routes";
import { linkRouter } from "./routes/link.routes";
import { redirectRouter } from "./routes/redirect.routes";

const PORT = config.get("port") || 8003;

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/links", linkRouter);

app.use("/t", redirectRouter);

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));

    app.listen(PORT, () =>
      console.log(`App has been started on port: ${PORT}`)
    );
  } catch (e: any) {
    console.log("Server message: ", e.message);

    process.exit(1);
  }
}

start();
