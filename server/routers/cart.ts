import { Request, Response } from 'express';
import { cart, removeItem, updateQuantityItem } from '../db/db-cart';


export function addToCart(req: Request, res: Response) {
    const { userId, productId, quantity } = req.body;

    cart.push({ userId, productId, quantity });
    res.status(200).json({ userId, productId, quantity });

}

export function fetchCart(req: Request, res: Response) {
    const userId = req.params["userId"];
    const cartByUserId = cart.filter(value => value.userId === userId);
    res.status(200).json(cartByUserId);
}

export function removeById(req: Request, res: Response) {
    const userId = req.params["userId"];
    const productId = req.params["productId"];
    const cartByUserId = removeItem(userId, productId);
    res.status(200).json(cartByUserId);
}

export function updateQuantity(req: Request, res: Response) {
    const userId = req.params["userId"];
    const productId = req.params["productId"];
    const quantity = +req.params["quantity"];
    console.log('update', userId, productId, quantity);
    const item = updateQuantityItem(userId, productId, quantity);
    res.status(200).json(item);
}
