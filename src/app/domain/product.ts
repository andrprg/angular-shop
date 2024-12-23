import { z } from "zod";

export const productIDSchema = z.string();

export const productSchema = z.object({
    id: productIDSchema,
    imageUrl: z.string().url(),
    title: z.string(),
    description: z.string(),
    price: z.number().nonnegative(),
    availableQuantity: z.number().nonnegative(),
    avgRating: z.number().nonnegative(),
    numRatings: z.number().nonnegative(),
});

export type ProductID = z.infer<typeof productIDSchema>;
export type Product = z.infer<typeof productSchema>;

