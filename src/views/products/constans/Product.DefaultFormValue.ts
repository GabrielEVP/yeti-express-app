import { Product, ProductPrice } from "@/views/products";

export const defaultProductPrice: ProductPrice = {
  id: "",
  price: 0,
  productId: "",
  typePriceId: "",
};

export const PRODUCTFORMSTATE: Product = {
  id: "",
  name: "",
  description: "",
  barcode: "",
  referenceCode: "",
  purchasePrice: 0,
  taxRate: 0,
  stockQuantity: 0,
  unitsPerBox: 1,
  userId: "",
  prices: [],
  categories: [],
  suppliers: [],
};
