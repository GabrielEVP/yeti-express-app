import { Delivery, DeliveryLine, DeliveryReceipt, DeliveryPayment } from "@views/deliveries/models/Delivery";

export function adaptDelivery(apiData: any): Delivery {
   return {
      id: apiData.id,
      number: apiData.number,
      date: apiData.date,
      status: apiData.status as "pending" | "paid" | "refused",
      currency: apiData.currency as "USD" | "BOV" | "OTH",
      paymentType: apiData.payment_type as "partial" | "full",
      total: apiData.total,
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
      lines: Array.isArray(apiData.lines) ? apiData.lines.map(adaptLine) : [],
      payments: Array.isArray(apiData.payments) ? apiData.payments.map(adaptPayment) : [],
      receipt: adaptReceipt(apiData.receipt),
   };
}

export function adaptDeliveryForApi(delivery: Delivery): any {
   return {
      id: delivery.id,
      number: delivery.number,
      date: delivery.date,
      status: delivery.status,
      currency: delivery.currency,
      payment_type: delivery.paymentType,
      total: delivery.total,
      comision: delivery.comision,
      notes: delivery.notes,
      client_id: delivery.clientId,
      client_address_id: delivery.clientAddressId,
      courier_id: delivery.courierId,
      open_box_id: delivery.openBoxId,
      close_box_id: delivery.closeBoxId,
      user_id: delivery.userId,
      lines: delivery.lines.map(adaptLineForApi),
      payments: delivery.payments.map(adaptPaymentForApi),
      receipt: adaptReceiptForApi(delivery.receipt),
   };
}

export function adaptLine(apiLine: any): DeliveryLine {
   return {
      id: apiLine.id,
      description: apiLine.description,
      quantity: apiLine.quantity,
      unitPrice: apiLine.unit_price,
      total: apiLine.total,
      deliveryId: apiLine.delivery_id,
      userId: apiLine.user_id,
   };
}

export function adaptLineForApi(line: DeliveryLine): any {
   return {
      id: line.id,
      description: line.description,
      quantity: line.quantity,
      unit_price: line.unitPrice,
      total: line.total,
      delivery_id: line.deliveryId,
      user_id: line.userId,
   };
}

export function adaptReceipt(apiReceipt: any): DeliveryReceipt {
   return {
      id: apiReceipt.id,
      fullName: apiReceipt.full_name,
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
      full_name: receipt.fullName,
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
      method: apiPayment.method,
      userId: apiPayment.user_id,
   };
}

export function adaptPaymentForApi(payment: DeliveryPayment): any {
   return {
      id: payment.id,
      date: payment.date,
      amount: payment.amount,
      delivery_id: payment.deliveryId,
      method: payment.method,
      user_id: payment.userId,
   };
}
