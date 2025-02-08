<template>
  <div class="flex h-screen">
    <div ref="toolbarRef" class="w1">
      <ToolBarComponent />
    </div>
    <div class="border-2 flex-1 border-blue-500">
      <CanvasComponent class="border-2 border-black-500" />
    </div>
    
    <!-- Bouton pour ouvrir le chat -->
    <MessageSquareText
      :size="40"
      class="text-4xl text-blue-500 cursor-pointer"
      style="position: absolute; top: 96%; left: 95%; transform: translate(-50%, -50%);"
      @click="isChatOpen = true"
    />
    
    <!-- Modal de chat -->
    <div v-if="isChatOpen" class="fixed inset-0 flex items-center justify-center">
      <div class="bg-gray-200 p-6 rounded-lg shadow-lg w-96 relative">
        <button @click="isChatOpen = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;</button>
        <h2 class="text-lg text-white font-bold text-gray-700 mb-4 bg-blue-500 rounded">Chat</h2>
        <div class="bg-gray-100 p-4 rounded-lg h-60 overflow-y-auto" style="background-image: repeating-linear-gradient(45deg, #ddd 0px, #ddd 1px, transparent 1px, transparent 20px);">
          <p v-for="(msg, index) in messages" :key="index" class="mb-2 text-gray-800">{{ msg }}</p>
        </div>
        <input 
          v-model="newMessage" 
          @keyup.enter="sendMessage" 
          class="w-full mt-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tapez votre message..."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ToolBarComponent from './ToolBarComponent.vue';
import CanvasComponent from './CanvasComponent.vue';
import { MessageSquareText } from 'lucide-vue-next';
import { useSocketStore } from '@/stores/useSocketStore';
import { useToast } from 'vue-toastification';

const toast = useToast();
const isChatOpen = ref(false);
const messages = ref<string[]>([]);
const newMessage = ref('');
const socketStore  = useSocketStore();

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    messages.value.push(newMessage.value);
    socketStore.emitEvent('chat message', messages.value);
    newMessage.value = '';
  }
};

onMounted(() => {
  socketStore.connectSocket();
  socketStore.socket?.on('serverMessage', (msg: string[]) => {
    console.log(msg);
    messages.value = msg;
  });
});
</script>
