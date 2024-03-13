export type ProductID = String;

export class Product {
    id!: ProductID;
    imageUrl!: string;
    title!: string;
    description!: string;
    price!: number;
    availableQuantity!: number;
    avgRating: number = 0;
    numRatings: number = 0;
}