import { Delivery, getDeliveryPaymentStatusLabel, getDeliveryStatusLabel } from '@views/deliveries';
import { formatDateCustom, formatToDollars } from '@utils';
import { useAlert } from '@composables';

export function copyToClipboard(delivery: Delivery) {
  const { triggerError, triggerSuccess } = useAlert();

  const text = `
🧾 *Ticket de Entrega*

*Número:* ${delivery.number}
*Fecha:* ${formatDateCustom(delivery.date)}

----------------------------
Direccion de retiro
 
👤 *Cliente:* ${delivery.clientLegalName}
📍 *Dirección:* ${delivery.pickupAddress || 'N/A'}

----------------------------

🚚 *Servicio:* ${delivery.serviceName}
💰 *Monto:* ${formatToDollars(delivery.amount)}
📌 *Estado del Pago:* ${getDeliveryPaymentStatusLabel(delivery.paymentStatus)}

----------------------------

🛵️ *Repartidor:* ${delivery.courierName}
📍 *Estado:* ${getDeliveryStatusLabel(delivery.status)}

----------------------------
Direccion de entrega del pedido 

🤝 *Recibe:* ${delivery.receipt.fullName || 'N/A'}
📞 *Teléfono:* ${delivery.receipt.phone || 'N/A'}
🏠 *Dirección de Entrega:* ${delivery.receipt.address || 'N/A'}

📝 *Nota:*
${delivery.notes || 'Sin notas'}

----------------------------

🙏 Gracias por confiar en Yeti express
🕒 ${formatDateCustom(new Date())}
  `.trim();

  navigator.clipboard
    .writeText(text)
    .then(() => triggerSuccess('✅ Copiado al portapapeles. ¡Listo para WhatsApp!'))
    .catch((err) => triggerError('Error al copiar al portapapeles:'));
}
