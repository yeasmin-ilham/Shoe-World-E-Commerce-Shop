import {z} from "zod"

export const productSchema = z.object({
    name:z.string(), 
    description:z.string(),
    price:z.number().nonnegative(),
    status:z.enum(["draft","published","archived"]),
    images:z.array(z.string()).min(1,"At least one image is required"),
    category:z.enum(["men","women","kids"]),
    isFeatured:z.boolean().optional(),
})