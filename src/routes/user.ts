import { Express } from 'express';

import { validateRequest, requiresUser } from "../middleware";
import { createUserHandler } from "../controller/user.controller";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema";

export default function (app: Express) {
  app.post('/user', validateRequest(createUserSchema), createUserHandler)
}