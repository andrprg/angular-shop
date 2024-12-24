import { z } from "zod";

export const productIDSchema = z.string();

export const productSchema = z.object({
    id: productIDSchema,
    imageUrl: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number().nonnegative(),
    availableQuantity: z.number().nonnegative(),
    avgRating: z.number().nullish().transform(val => !val || val < 0 ? 0: val),
    numRatings: z.number().nullish().transform(val => !val || val < 0 ? 0: val),
});

export const productsSchema = z.array(productSchema);

export type ProductID = z.infer<typeof productIDSchema>;
export type Product = z.infer<typeof productSchema>;

