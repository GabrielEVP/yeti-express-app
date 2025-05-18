import { object, string, number, array } from "yup";
import { categorySchema } from "@/views/categories/";

export const productPriceSchema = object({
   id: string().required(),
   price: number().min(0).required(),
});

export const supplierSchema = object({
   id: string().required(),
   name: string().required(),
   contact: string().required(),
});

export const ProductSchema = object({
   id: string().required(),
   name: string().required(),
   description: string().required(),
   barcode: string().nullable(),
   referenceCode: string().nullable(),
   purchasePrice: number().min(0).required(),
   taxRate: number().min(0).required(),
   stockQuantity: number().min(0).required(),
   unitsPerBox: number().min(1).required(),
   userId: string().required(),
   prices: array().of(productPriceSchema).required(),
   categories: array().of(categorySchema).required(),
   suppliers: array().of(supplierSchema).required(),
});
