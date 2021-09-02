import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, findUser } from "../service/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const emailFinded = await findUser({ email: req.body.email })
    if (emailFinded) { return res.status(400).json({ message: 'Email já existe' }) }
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
