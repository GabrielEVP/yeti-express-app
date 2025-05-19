import { Delivery, DeliveryLine, DeliveryReceipt, DeliveryPayment } from "@views/deliveries/models/Delivery";

export function adaptDelivery(apiData: any): Delivery {
   return {
      id: apiData.id,
      date: apiData.date,
      status: apiData.status as "pending" | "paid" | "refused",
      currency: apiData.currency as "USD" | "BOV" | "OTHERS",
      typePayment: apiData.type_payment as "Partial" | "Full",
      totalAmount: apiData.total_amount,
      comision: apiData.comision,
      notes: apiData.notes,
      clientId: apiData.client_id,
      clientAddressId: apiData.client_address_id,
      courierId: apiData.courier_id,
      openBoxId: apiData.open_box_id,
      closeBoxId: apiData.close_box_id,
      userId: apiData.user_id,
      createdAt: apiData.created_at,
      updatedAt: apiData.updated_at,
      deliveryLines: Array.isArray(apiData.lines) ? apiData.lines.map(adaptLine) : [],
      deliveryPayments: Array.isArray(apiData.payments) ? apiData.payments.map(adaptPayment) : [],
      deliveryReceipts: adaptReceipt(apiData.receipt),
   };
}

export function adaptDeliveryForApi(delivery: Delivery): any {
   return {
      id: delivery.id,
      date: delivery.date,
      status: delivery.status,
      currency: delivery.currency,
      type_payment: delivery.typePayment,
      total_amount: delivery.totalAmount,
      comision: delivery.comision,
      notes: delivery.notes,
      client_id: delivery.clientId,
      client_address_id: delivery.clientAddressId,
      courier_id: delivery.courierId,
      open_box_id: delivery.openBoxId,
      close_box_id: delivery.closeBoxId,
      user_id: delivery.userId,
      lines: delivery.deliveryLines.map(adaptLineForApi),
      payments: delivery.deliveryPayments.map(adaptPaymentForApi),
      receipt: adaptReceiptForApi(delivery.deliveryReceipts),
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
   };
}

export function adaptReceipt(apiReceipt: any): DeliveryReceipt {
   return {
      id: apiReceipt.id,
      full_name: apiReceipt.full_name,
      delivery_id: apiReceipt.delivery_id,
      phone: apiReceipt.phone,
      address: apiReceipt.address,
      state: apiReceipt.state,
      city: apiReceipt.city,
      municipality: apiReceipt.municipality,
      postalCode: apiReceipt.postal_code,
      deliveryId: apiReceipt.delivery_id,
      userId: apiReceipt.user_id,
   };
}

export function adaptReceiptForApi(receipt: DeliveryReceipt): any {
   return {
      id: receipt.id,
      full_name: receipt.full_name,
      delivery_id: receipt.delivery_id,
      phone: receipt.phone,
      address: receipt.address,
      state: receipt.state,
      city: receipt.city,
      municipality: receipt.municipality,
      postal_code: receipt.postalCode,
      user_id: receipt.userId,
   };
}

export function adaptPayment(apiPayment: any): DeliveryPayment {
   return {
      id: apiPayment.id,
      date: apiPayment.date,
      amount: apiPayment.amount,
      deliveryId: apiPayment.delivery_id,
   };
}

export function adaptPaymentForApi(payment: DeliveryPayment): any {
   return {
      id: payment.id,
      date: payment.date,
      amount: payment.amount,
      delivery_id: payment.deliveryId,
   };
}
