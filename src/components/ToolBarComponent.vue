<template>
  <div class=" toolbar flex flex-col gap-5 items-center space-y-6 p-8 bg-white shadow-md rounded-xl w-72">
    <div class="flex space-x-4">
      <button class="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
        <Paintbrush :size="24" />
      </button>
      <button class="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition">
        <Eraser :size="24" />
      </button>
    </div>
    <div class="flex items-center space-x-4 w-full">
      <label for="colorPicker" class="text-gray-700">Couleur</label>
      <input type="color" id="colorPicker" class="w-12 h-12 rounded-lg border" />
    </div>
    <div class="flex items-center space-x-4 w-full">
      <label for="thickness" class="text-gray-700">Épaisseur</label>
      <input
        type="range"
        id="thickness"
        min="1"
        max="100"
        step="1"
        value="50"
        class="w-full cursor-pointer"
      />
    </div>
    <button
      class="flex items-center justify-center w-full p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
    >
      <RotateCcw :size="24" />
      <span class="ml-2">Effacer</span>
    </button>
    <button
      class="flex items-center justify-center w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
    >
      <Download :size="24" />
      <span class="ml-2">Télécharger</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Paintbrush, Eraser, RotateCcw, Download } from 'lucide-vue-next'
</script>

<style scoped>
input[type='color']::-webkit-color-swatch {
  border-radius: 8px;
  border: none;
}
</style>
