import { ProductID } from "./product";

export interface Item {
    productId: ProductID;
    price: number;
    quantity: number;
}