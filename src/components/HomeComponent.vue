<template>
  <div class="flex h-screen">
    <div ref="toolbarRef"  class="w-1/3">
      <ToolBarComponent/>
    </div>
    <div class="border-2 flex-1 border-blue-500">
      <CanvasComponent class="border-2 border-black-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Camera } from 'lucide-vue-next'
import { UserPen } from 'lucide-vue-next'
import ToolBarComponent from './ToolBarComponent.vue'
import CanvasComponent from './CanvasComponent.vue'
</script>

<style></style>
