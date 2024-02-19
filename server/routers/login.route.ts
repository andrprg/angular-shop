import {Request, Response} from 'express';
import { authenticate } from '../db/db-users';

export function loginUser(req: Request, res: Response) {
  const {login, password} = req.body;

  const user = authenticate(login, password);
  const {id, name, email} = user;
  console.log("User ...", user);

  if (user) {
    res.status(200).json({id,name,email});
  }
  else {
    res.status(403).json({message: 'Неверный логин или пароль.'}); // .sendStatus(403);
  }

}