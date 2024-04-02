import { Request, Response } from 'express';
import { cart, removeItem } from '../db/db-cart';


export function addToCart(req: Request, res: Response) {
    const { userId, productId, quantity } = req.body;
    
    cart.push({userId, productId, quantity});
    console.log('addToCart', cart);
    res.status(200).json({userId, productId, quantity});

}

export function fetchCart(req: Request, res: Response) {
    const userId = req.params["userId"];
    console.log('fetchCart-1:', userId, cart);
    const cartByUserId = cart.filter(value => value.userId === userId);
    console.log('fetchCart=2:', userId, cart);
    res.status(200).json(cartByUserId);
}

export function removeById(req: Request, res: Response) {
    const userId = req.params["userId"];
    const productId = req.params["productId"];
    console.log('remove-1:', userId, productId, cart);
    const cartByUserId = removeItem(userId, productId);
    console.log('remove-2:', cartByUserId);
    res.status(200).json(cartByUserId);
}
