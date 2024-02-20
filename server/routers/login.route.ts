import { Request, Response } from 'express';
import { authenticate } from '../db/db-users';
import { CONFIG } from '../config';
const jwt = require('jsonwebtoken');
const tokenList = new Map();

export function loginUser(req: Request, res: Response) {
    const { login, password } = req.body;
    const user = authenticate(login, password);
    console.log("User ...", user);

    if (user) {
        const { id, name, email } = user;
        const token = jwt.sign({ id, name, email }, CONFIG.secret, { expiresIn: CONFIG.tokenLife })
        const refreshToken = jwt.sign(user, CONFIG.refreshTokenSecret, { expiresIn: CONFIG.refreshTokenLife })
        const response = {
            "token": token,
            "refreshToken": refreshToken,
        }
        tokenList.set(refreshToken, response);

        res.status(200).json(response);
    } else {
        res.status(403).json({ message: 'Неверный логин или пароль.' });
    }

}