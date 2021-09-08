import jwt from "jsonwebtoken";
import config from "../config/index";

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, config.privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, config.privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
