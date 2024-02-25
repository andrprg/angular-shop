import { Request, Response } from 'express';
import { authenticate } from '../db/db-users';
import { CONFIG } from '../config';
const jwt = require('jsonwebtoken');
const tokenList = new Map();

export function loginUser(req: Request, res: Response) {
    const { login, password } = req.body;
    const user = authenticate(login, password);

    if (user) {
        const { id, name, email } = user;
        const token = jwt.sign({ id, name, email }, CONFIG.secret, { expiresIn: CONFIG.tokenLife })
        const refreshToken = jwt.sign({ id, name, email }, CONFIG.refreshTokenSecret, { expiresIn: CONFIG.refreshTokenLife })
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

export function token(req: Request, res: Response)  {
    const postData = req.body
    if((postData.refreshToken) && (postData.refreshToken === tokenList.get(postData.refreshToken).refreshToken)) {
        const { id, name, email } = postData;
        const token = jwt.sign({ id, name, email }, CONFIG.secret, { expiresIn: CONFIG.tokenLife})
        const response = {
            "token": token,
        }
        tokenList.set(postData.refreshToken, {'refreshToken': postData.refreshToken, token});
        res.status(200).json(response);        
    } else {
        res.status(404).send('Unauthorized');
    }
}

export function revokeToken(req: Request, res: Response) {
    const postData = req.body;
    if(postData.refreshToken === tokenList.get(postData.refreshToken)?.refreshToken) {
        tokenList.delete(postData.refreshToken);
        res.status(200).json({"revoke": "success"});  
    } else {
        res.status(400).send('Token not found');
    }
    
}