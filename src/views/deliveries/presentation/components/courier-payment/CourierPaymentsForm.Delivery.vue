<template>
  <div class="flex justify-end mb-4">
    <PlusButton
      @click="push(new DeliveryCourierPayment('', '', PaymentMethod.MOBILE_PAYMENT, 0, ''))"
    />
  </div>
  <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
    <Text>No hay pagos agregados</Text>
  </div>
  <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 border p-4 rounded-md mb-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold dark:text-white">Pagos {{ idx + 1 }}</h3>
      <TrashButton type="button" @click="remove(idx)" />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
      <FieldForm
        label="Fecha"
        type="date"
        :name="`payments[${idx}].date`"
        :id="`payments-${idx}`"
      />
      <FieldForm
        label="Monto"
        type="number"
        :name="`payments[${idx}].amount`"
        :id="`payments-${idx}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFieldArray } from 'vee-validate';
import { DeliveryCourierPayment } from '@views/deliveries/domain';
import { PaymentMethod } from '@/views/deliveries/domain/PaymentMethod';
import { PlusButton, TrashButton, FieldForm, Text } from '@/components/';

const { remove, push, fields } = useFieldArray<DeliveryCourierPayment>('payments');
</script>
