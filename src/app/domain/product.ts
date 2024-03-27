export type ProductID = string;

export interface Product {
    id: ProductID;
    imageUrl: string;
    title: string;
    description: string;
    price: number;
    availableQuantity: number;
    avgRating: number;
    numRatings: number;
}