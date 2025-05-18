import { Product, ProductPrice } from "@/views/products";
import { adaptSupplierForApi, adaptSupplier } from "@/views/suppliers";

export function adaptProduct(apiData: any): Product {
   return {
      id: apiData.id,
      name: apiData.name,
      description: apiData.description,
      barcode: apiData.barcode,
      referenceCode: apiData.reference_code,
      purchasePrice: Number(apiData.purchase_price),
      taxRate: Number(apiData.tax_rate),
      stockQuantity: Number(apiData.stock_quantity),
      unitsPerBox: Number(apiData.units_per_box),
      userId: apiData.user_id,
      prices: Array.isArray(apiData.prices) ? apiData.prices.map(adaptProductPrice) : [],
      categories: Array.isArray(apiData.categories) ? apiData.categories.map(adaptCategory) : [],
      suppliers: Array.isArray(apiData.suppliers) ? apiData.suppliers.map(adaptSupplier) : [],
   };
}

export function adaptProductPrice(api: any): ProductPrice {
   return {
      id: api.id,
      price: Number(api.price),
      productId: api.product_id,
      typePriceId: api.type_price_id,
   };
}

export function adaptProductForApi(product: Product): any {
   return {
      id: product.id,
      name: product.name,
      description: product.description,
      barcode: product.barcode,
      reference_code: product.referenceCode,
      purchase_price: product.purchasePrice,
      tax_rate: product.taxRate,
      stock_quantity: product.stockQuantity,
      units_per_box: product.unitsPerBox,
      user_id: product.userId,
      prices: product.prices.map(adaptProductPriceForApi),
      categories: product.categories.map(adaptCategoryForApi),
      suppliers: product.suppliers.map(adaptSupplierForApi),
   };
}

export function adaptProductPriceForApi(price: ProductPrice): any {
   return {
      id: price.id,
      price: price.price,
      product_id: price.productId,
      type_price_id: price.typePriceId,
   };
}
