import { Line } from "@/models/";

export function adaptLine(apiLine: any): Line {
   return {
      id: apiLine.id,
      description: apiLine.description,
      quantity: apiLine.quantity,
      unitPrice: apiLine.unit_price,
      taxRate: apiLine.tax_rate,
      totalAmount: apiLine.total_amount,
      totalTaxAmount: apiLine.total_tax_amount,
      invoiceId: apiLine.invoice_id,
      productId: apiLine.product_id,
   };
}

export function adaptLineForApi(line: Line): any {
   return {
      id: line.id,
      description: line.description,
      quantity: line.quantity,
      unit_price: line.unitPrice,
      tax_rate: line.taxRate,
      total_amount: line.totalAmount,
      total_tax_amount: line.totalTaxAmount,
      invoice_id: line.invoiceId,
      product_id: line.productId,
   };
}
