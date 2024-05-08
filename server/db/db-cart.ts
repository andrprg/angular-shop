
interface Item {
    userId: string;
    productId: string;
    price: number;
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
    const deleteItem = cart.find(value => value.userId === userId  && value.productId === productId);
    cart = cart.filter(value => value.userId === userId  && value.productId !== productId);   
    return deleteItem;
}

export function updateQuantityItem(userId: string, productId: string, quantity: number) {
    let item = cart.find(value => value.userId === userId  && value.productId === productId); 
    if(item && quantity > 0 ) {
        item.quantity = quantity;  
        return item;
    }    
    return;    
}

export function clearCart(userId: string) {
    cart = cart.filter(item => item.userId !== userId);
    return cart;
}