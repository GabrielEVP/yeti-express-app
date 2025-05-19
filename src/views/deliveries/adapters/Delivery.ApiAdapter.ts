import { Delivery, DeliveryLine, DeliveryPayment } from "@/views/deliveries/";

export function adaptDelivery(apiData: any): Delivery {
   return {
      id: apiData.id,
      number: apiData.number,
      date: apiData.date,
      status: apiData.status as "pending" | "paid" | "refused",
      totalAmount: apiData.total_amount,
      totalTaxAmount: apiData.total_tax_amount,
      notes: apiData.notes,
      clientId: apiData.client_id,
      userId: apiData.user_id,
      lines: Array.isArray(apiData.lines) ? apiData.lines.map(adaptLine) : [],
      payments: Array.isArray(apiData.payments) ? apiData.payments.map(adaptPayment) : [],
   };
}

export function adaptDeliveryForApi(delivery: Delivery): any {
   return {
      id: delivery.id,
      number: delivery.number,
      date: delivery.date,
      status: delivery.status,
      total_amount: delivery.totalAmount,
      total_tax_amount: delivery.totalTaxAmount,
      notes: delivery.notes,
      client_id: delivery.clientId,
      user_id: delivery.userId,
      lines: delivery.lines.map(adaptLineForApi),
      payments: delivery.payments.map(adaptPaymentForApi),
   };
}

export function adaptLine(apiLine: any): DeliveryLine {
   return {
      id: apiLine.id,
      description: apiLine.description,
      quantity: apiLine.quantity,
      unitPrice: apiLine.unit_price,
      taxRate: apiLine.tax_rate,
      totalAmount: apiLine.total_amount,
      totalTaxAmount: apiLine.total_tax_amount,
      deliveryId: apiLine.delivery_id,
      productId: apiLine.product_id,
   };
}

export function adaptLineForApi(line: DeliveryLine): any {
   return {
      id: line.id,
      description: line.description,
      quantity: line.quantity,
      unit_price: line.unitPrice,
      tax_rate: line.taxRate,
      total_amount: line.totalAmount,
      total_tax_amount: line.totalTaxAmount,
      delivery_id: line.deliveryId,
      product_id: line.productId,
   };
}

export function adaptPayment(apiPayment: any): DeliveryPayment {
   return {
      id: apiPayment.id,
      date: apiPayment.date,
      amount: apiPayment.amount,
      typePaymentId: apiPayment.type_payment_id,
      deliveryId: apiPayment.delivery_id,
   };
}

export function adaptPaymentForApi(payment: DeliveryPayment): any {
   return {
      id: payment.id,
      date: payment.date,
      amount: payment.amount,
      type_payment_id: payment.typePaymentId,
      delivery_id: payment.deliveryId,
   };
}
