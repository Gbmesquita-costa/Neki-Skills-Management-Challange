import rateLimit from "express-rate-limit";
import { AppError } from "@/shared/errors/AppError";

const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute,
  limit: 10,
  skip: (request) => {
    return false; // Don't skip any requests
  },
  keyGenerator: (request): any => {
    const clientIP =
      request?.headers["cf-connecting-ip"] ||
      request?.headers["x-real-ip"] ||
      request?.headers["x-forwarded-for"] ||
      request?.socket.remoteAddress ||
      "";

    return clientIP;
  },
  message: {
    message:
      "Muitas tentativas de login deste IP. Tente novamente após 1 minuto",
  },
  handler: (req, res, next, options) => {
    throw new AppError(options.message.message);
  },
  standardHeaders: "draft-7",
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export { loginRateLimiter };
