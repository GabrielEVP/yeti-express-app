import { getDeliveryPaymentStatusLabel, getDeliveryStatusLabel } from '@/views/deliveries/models';
import { formatDateCustom, formatToDollars } from '@/utils';
import { useAlert } from '@/composables';

export function copyToClipboard(delivery: any) {
  const { triggerError, triggerSuccess } = useAlert();

  const text = `
🧾 *Ticket de Entrega*

*Número:* ${delivery.number}
*Fecha:* ${formatDateCustom(delivery.date)}

----------------------------
*Direccion de retiro*
 
👤 *Cliente:* ${delivery.client_legal_name}
📍 *Dirección:* ${delivery.pickup_address || 'N/A'}

----------------------------

🚚 *Servicio:* ${delivery.service_name}
💰 *Monto:* ${formatToDollars(delivery.amount)}
📌 *Estado del Pago:* ${getDeliveryPaymentStatusLabel(delivery.payment_status)}

----------------------------

🛵️ *Repartidor:* ${delivery.courier_full_name}
📍 *Estado:* ${getDeliveryStatusLabel(delivery.status)}

----------------------------
*Direccion de entrega del pedido*

🤝 *Recibe:* ${delivery.receipt_full_name || 'N/A'}
📞 *Teléfono:* ${delivery.receipt_phone || 'N/A'}
🏠 *Dirección de Entrega:* ${delivery.receipt_address || 'N/A'}

📝 *Nota:*
${delivery.notes || 'Sin notas'}

----------------------------

🙏 Gracias por confiar en Yetiexpress
🕒 ${formatDateCustom(new Date())}
  `.trim();

  navigator.clipboard
    .writeText(text)
    .then(() => triggerSuccess('✅ Copiado al portapapeles. ¡Listo para WhatsApp!'))
    .catch((err) => triggerError('Error al copiar al portapapeles:'));
}
