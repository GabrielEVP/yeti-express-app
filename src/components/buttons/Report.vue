<template>
  <Button class="bg-green-500 text-white hover:bg-green-600">
    <slot/>
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@components';
</script>