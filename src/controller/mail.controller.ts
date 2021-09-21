import { Request, Response } from "express";
import { random } from "lodash";
import nodemailer from 'nodemailer';
import log from "../logger";

export async function sendEmailHandler(req: Request, res: Response) {
  try {
    const code = Math.floor(100000* Math.random() + 1);
    const { email, name } = req.body
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'lucasviniciusaalves@gmail.com', // generated ethereal user
        pass: '!Luv120mlj#', // generated ethereal password
      },
    });
    await transporter.sendMail({
      from: 'lucasviniciusaalves@gmail.com', // sender address
      to: email, // list of receivers"
      subject: "Confirmação Email", // Subject line
      text: `Olá, ${name} seu código de verificação é: ${code}`, // plain text body
      html: `<b>Olá, ${name} seu código de verificação é: ${code}</b>`, // html body
    });
    return res.status(200).send(code);
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
