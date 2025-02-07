<template>
  <canvas
    class="border-4 border-blue-500 w-full canvas"
    ref="canvasRef"
    @mousedown="startDrawing"
    @mousemove="draw"
    @mouseup="stopDrawing"
    @mouseout="stopDrawing"
  >
  </canvas>
</template>
<script setup lang="ts">
import { clearCanvas, drawLine } from "../utils/canvas";
import { ref, onMounted, withCtx } from "vue";
import { useDrawingStore } from "../stores/useDrawingStore";
// stockage du store dans une variable
const drawingStore = useDrawingStore();
// récupérer
const canvasRef = ref<HTMLCanvasElement | null>(null);
// coordonnées du dernier point
const lastPoint = ref<{ x: number; y: number } | null>();
// Variable pour vérifier si le dessin a commencé

// Fonction de commencement du dessin
const startDrawing = (event: MouseEvent) => {
  drawingStore.setIsDrawing(true);

  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();

  // Le coin supérieur gauche est le point de repère d'un navigateur
  // récupérer l'événement premier clic de la souris
  lastPoint.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

// Fonction d'arrêt du dessin
const stopDrawing = () => {
  // arrêter le dessin
  drawingStore.setIsDrawing(false);
  // définir à null la valeur du dernier point
};

// Fonction de redimension du canvas
const resizeCanvas = () => {
  // Récupération de l'élément toolbar du conteneur Home
  const toolbar = document.querySelector(".toolbar");
  const canvas = canvasRef.value;
  if (!canvas || !toolbar) return;

  canvas.width = window.innerWidth - toolbar.clientWidth;
  canvas.height = window.innerHeight;
};


// Dessiner
const draw = (e: MouseEvent) => {
  // vérifie si isDrawing est à false (le dessin n'est pas en cours)
  if (!drawingStore.isDrawing) return;
  // récupération de l'élément canvas depuis le html
  const canvas = canvasRef.value;
  // si l'élément n'existe pas , ne rien retourner
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  // si le dernier point n'existe  pas , ne rien retourner
  if (!lastPoint.value) return;

  // coordonnées du point actuel
  const currentPoint = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };

  // spécifier le context à l'élément canvas
  const ctx = canvas.getContext("2d");
  // si l'élément n'existe pas, ne rien retourner
  if (!ctx) return;

  drawLine(ctx,lastPoint.value,currentPoint, drawingStore.color, drawingStore.lineWidth, drawingStore.isEraser);

  lastPoint.value = currentPoint;
};

onMounted(() => {
  // appel de la fonction de redimension lors du montage du composant
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
});
</script>