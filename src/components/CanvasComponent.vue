<template>
  <canvas ref="canvasRef" class="border-2 border-green-500" @mousemove="draw" @mousedown="startDrawing">
  </canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const toolbarRef = ref<HTMLCanvasElement | null>(null)
const lastPosition = ref<{ x: number; y: number } | null>(null)
const resizeCanvas = () => {
  const canvas = canvasRef.value
  const toolbar = document.querySelector('.toolbar')

  if (!canvas || !toolbar) return
  canvas.width = window.innerWidth - toolbar.clientWidth
  canvas.height = window.innerHeight
}

// Démarre le dessin
const startDrawing = (e: MouseEvent) => {
  lastPosition.value = { x: e.clientX, y: e.clientY }
  console.log('startDrawing', lastPosition.value)
}

// Dessine
const draw = (e: MouseEvent) => {

  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const currentPosition = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }

  if (!lastPosition.value) return
  const ctx = canvasRef.value?.getContext('2d')
  if (!ctx) return
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.moveTo(lastPosition.value.x, lastPosition.value.y);
  ctx.lineTo(currentPosition.x, currentPosition.y);
  ctx.stroke();

}

onMounted(() => {
  resizeCanvas()
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvasRef.value?.getContext('2d')
  if (!ctx) return
})
</script>

<style></style>
