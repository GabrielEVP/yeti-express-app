<template>
   <Card class="p-9">
      <h1 class="mb-10 text-2xl font-bold text-black dark:text-white">Actividad Reciente</h1>
      <div>
         <Line v-if="lineContents.length > 0">
            <template v-for="lineContent in lineContents">
               <LineContent :icon="lineContent.icon">
                  <h1 class="font-medium leading-none mb-2">{{ lineContent.title }}</h1>
                  <Text class="text-sm text-gray-500">{{ lineContent.text }}</Text>
                  <p class="text-xs text-gray-500">{{ lineContent.date }}</p>
               </LineContent>
            </template>
         </Line>
         <EmptyData v-else class="mt-10" />
      </div>
   </Card>
</template>

<script setup lang="ts">
import { Card, Text, Line, LineContent, EmptyData } from "@/components/";
import { type TimeLineContent } from "@models/LineContent";

defineProps<{
   lineContents: TimeLineContent[];
}>();
</script>
