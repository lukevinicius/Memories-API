import { Request, Response } from "express";
import { get } from "lodash";
import { omit } from "lodash";
import { createUser, findUser, findAndUpdate } from "../service/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const emailFinded = await findUser({ email: req.body.email })
    if (emailFinded) { return res.status(400).json({ message: 'Email já existe' }) }
    const usernameFinded = await findUser({ username: req.body.username })
    if (usernameFinded) { return res.status(400).json({ message: 'Nome de usuário já existe' }) }
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

// Atualização de dados do usuário
export async function updatePostHandler(req: Request, res: Response) {
  const userId = get(req, "params._id");
  const update = req.body;

  const user = await findUser({ userId });

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await findAndUpdate({ userId }, update, { new: true });

  return res.send(updatedUser);
}
