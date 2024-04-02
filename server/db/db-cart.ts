
interface Item {
    userId: string;
    productId: string;
    quantity: number;
}

export let cart: Item[] = [
    /*
    {
        "userId": '1',
        "productId": "1",
        "quantity": 123
    },
    {
        "userId": '1',
        "productId": "2",
        "quantity": 123
    },
    {
        "userId": '1',
        "productId": "3",
        "quantity": 123
    }
    */
]

export function removeItem(userId: string, productId: string) {
    cart = cart.filter(value => value.userId === userId  && value.productId !== productId);   
    return cart;
}