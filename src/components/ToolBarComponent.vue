<script setup lang="ts">
import { Paintbrush, Eraser, RotateCcw, Download } from "lucide-vue-next";
import { ref } from "vue";
import { useDrawingStore } from "@/stores/useDrawingStore";
import { clearCanvas } from "@/utils/canvas";
const drawingStore = useDrawingStore();

const previousColor = ref(drawingStore.color);
// Référence pour stocker la couleur précédente

const useEraser = () => {
  previousColor.value = drawingStore.color; // Enregistrer la couleur actuelle avant de changer
  drawingStore.setColor("white"); // Changer la couleur en blanc
  drawingStore.setIsEraser(true); // Activer la gomme
};

const useBrush = () => {
  drawingStore.setColor(previousColor.value); // Restaurer la couleur précédente
  drawingStore.setIsEraser(false); // Désactiver la gomme
};

const handleClear = () => {
  const canvasElement = document.querySelector(".canvas") as HTMLCanvasElement;
  if(!canvasElement) return;
  const ctx = canvasElement.getContext("2d");
  if(!ctx) return;
  clearCanvas(ctx, canvasElement.clientWidth, canvasElement.clientHeight);
}
</script>
<template>
  <div
    class="toolbar flex flex-col items-center shadow-lg p-4 bg-white rounded-lg border border-gray-300 mt-5 w-full"
  >
    <!-- Icônes de pinceau et de gomme -->
     <!-- <div class="flex gap-4 mb-4 w-full justify-center">
      <button
        :class="`flex bg-blue-200  transition duration-200 ease-in-out p-3 rounded-lg shadow-md w-full max-w-[100px] justify-center cursor-pointer ${!drawingStore.isEraser ? 'bg-yellow-400' : 'bg-gray-200'}`"
        @click="useBrush"
        title="Pinceau"
      >
        <Paintbrush :size="40" color="blue" />
      </button>
      <button
        :class="`flex bg-gray-200 transition duration-200 ease-in-out p-3 rounded-lg shadow-md w-full max-w-[100px] justify-center cursor-pointer ${!drawingStore.isEraser ? 'bg-gray-200' : 'bg-yellow-400'}`"
        title="Gomme"
        @click="useEraser"
      >
        <Eraser :size="40" color="green" />
      </button>
    </div>  -->

    <div class="flex gap-4 mb-4 w-full justify-center">
      <button
        :class="`flex bg-blue-200  transition duration-200 ease-in-out p-3 rounded-lg shadow-md w-full max-w-[100px] justify-center cursor-pointer ${!drawingStore.isEraser ? 'bg-yellow-400' : 'bg-gray-200'}`"
        @click="drawingStore.setIsEraser(false)"
        title="Pinceau"
      >
        <Paintbrush :size="40" color="blue" />
      </button>
      <button
        :class="`flex bg-gray-200 transition duration-200 ease-in-out p-3 rounded-lg shadow-md w-full max-w-[100px] justify-center cursor-pointer ${!drawingStore.isEraser ? 'bg-gray-200' : 'bg-yellow-400'}`"
        title="Gomme"
        @click="drawingStore.setIsEraser(true)"
      >
        <Eraser :size="40" color="green" />
      </button>
    </div>

    <!-- Conteneur de couleur -->
    <div class="w-full mb-4" v-if="!drawingStore.isEraser">
      <label class="mt-2 font-semibold block text-gray-700">Couleur</label>
      <input
        type="color"
        class="w-full mt-2 border border-gray-400 rounded-lg p-1"
        v-model="drawingStore.color"
        @change="drawingStore.setColor(drawingStore.color)"
      />
    </div>

    <!-- Conteneur d'épaisseur -->
    <div class="w-full mb-4">
      <label class="mt-2 font-semibold block text-gray-700">Épaisseur</label>
      <input
        type="range"
        class="w-full mt-2 h-2 bg-gray-300 rounded-lg cursor-pointer"
        min="1"
        max="25"
        v-model="drawingStore.lineWidth"
        @change="drawingStore.setLineWidth(drawingStore.lineWidth)"
      />
    </div>

    <!-- Conteneur de nettoyage et de sauvegarde -->
    <div class="flex flex-col justify-center p-2 gap-3 w-full">
      <!-- Nettoyage -->
      <button
        class="flex gap-2 bg-red-300 hover:bg-red-400 transition duration-200 ease-in-out p-2 rounded-lg shadow-md w-full cursor-pointer items-center justify-center"
      >
        <RotateCcw :size="20" color="red" />
        <span class="text-red-700 font-semibold" @click="handleClear">Nettoyer</span>
      </button>
      <!-- Sauvegarde -->
      <button
        class="flex gap-2 bg-blue-200 hover:bg-blue-300 transition duration-200 ease-in-out p-2 rounded-lg shadow-md w-full cursor-pointer items-center justify-center"
      >
        <Download :size="20" color="blue" />
        <span class="text-blue-800 font-semibold">Sauvegarder</span>
      </button>
    </div>
  </div>
</template>
