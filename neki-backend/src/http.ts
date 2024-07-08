import "reflect-metadata";
import "express-async-errors";
import "@/shared";

import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";

import cors from "cors";

import { routes } from "./routes/routes";
import { env } from "./env";

import { ZodError } from "zod";
import { AppError } from "./shared/errors/AppError";

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

import cookieParser from "cookie-parser";

const app = express();
app.use(helmet());

app.enable("trust proxy"); // To be able to get the client's real IP

app.use(
  cors({
    origin: env.HTTP_REQUEST,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof ZodError) {
      return response
        .status(400)
        .json({ message: "Validation Error", issues: err.format() });
    }

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    if (env.NODE_ENV !== "production") {
      console.error(err);
    } else {
      // for production sentry, datadog, etc.
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

export { app };
