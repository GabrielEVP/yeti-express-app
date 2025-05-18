import { Supplier } from "@/views/suppliers/";
import { Category } from "@/views/categories/";

export interface Product {
   id: string;
   name: string;
   description: string;
   barcode: string;
   referenceCode: string;
   purchasePrice: number;
   taxRate: number;
   stockQuantity: number;
   unitsPerBox: number;
   userId: string;
   prices: ProductPrice[];
   categories: Category[];
   suppliers: Supplier[];
}

export interface ProductPrice {
   id: string;
   price: number;
   productId: string;
   typePriceId: string;
}

export interface ProductCategory {
   id: string;
   productId: string;
   categoryId: string;
}

export interface ProductSupplier {
   id: string;
   productId: string;
   supplierId: string;
}
