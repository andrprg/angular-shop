import { z } from "zod";
import { productIDSchema } from "./product";

export const itemSchema = z.object({ 
    productId: productIDSchema, 
    price: z.number().nonnegative(), 
    quantity: z.number().nonnegative(), 
});

export type Item = z.infer<typeof itemSchema>;

