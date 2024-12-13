import { z } from "zod"

const productSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string(),
  items: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
})

/**
 * Type representing the product data.
 *
 * This type is inferred from the `productSchema` Zod schema and ensures the structure
 * of the product object, including validation rules like `title` being required.
 */
export type ProductFormValues = z.infer<typeof productSchema>

export default productSchema
