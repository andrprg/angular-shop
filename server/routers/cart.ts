import { Request, Response } from 'express';
import { cart, clearCart, removeItem, updateQuantityItem } from '../db/db-cart';


export function addToCart(req: Request, res: Response) {
    const { userId, productId, quantity } = req.body;
    const index = cart.findIndex(item =>item.userId === userId && item.productId === productId);
    if(index < 0) {
        cart.push({ userId, productId, quantity });
        res.status(200).json({ userId, productId, quantity });    
    } else {
        res.status(500).json({ status: 500, message: 'Продукт уже есть в корзине' })
    }    
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
    const { userId, productId, quantity } = req.body;    
    const item = updateQuantityItem(userId, productId, quantity);
    if(item) {
        res.status(200).json(item);
    } else {
        res.status(500).json({ status: 500, message: 'Во время обновления произошла ошибка' })
    }

}

export function clear(req: Request, res: Response) {
    const userId = req.params["userId"];
    const cart = clearCart(userId);
    res.status(200).json(cart);
}
