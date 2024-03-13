import { getProducts } from "../db/db-products";
import { Request, Response } from 'express';
import { CONFIG } from '../config';
const jwt = require('jsonwebtoken');

export function products(req: Request, res: Response) {    
    const authHeader = req.headers.authorization; 
    const products = getProducts();
    /*
    if (!authHeader) { 
        return res.status(401).json({ status: 401, message: 'Unauthorize user!' });        
    }

    const token = authHeader.split(' ')[1];     
    try {
        jwt.verify(token, CONFIG.secret);
    } catch(e) {
        return res.status(401).json({ status: 401, message: 'Unauthorize user!' }); 
    }
    */
    
    if(!products) {
        return res.status(500).json({ status: 500, message: 'Ошибка сервера' });        
    }

    res.status(200).json(products);

}