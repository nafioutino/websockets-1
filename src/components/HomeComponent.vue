<template>
  <div class="flex h-screen">
    <div ref="toolbarRef" class="w1">
      <ToolBarComponent />
    </div>
    <div class="border-2 flex-1 border-blue-500">
      <CanvasComponent class="border-2 border-black-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ToolBarComponent from './ToolBarComponent.vue';
import CanvasComponent from './CanvasComponent.vue';
import { POSITION, useToast } from 'vue-toastification';
import { useSocketStore } from '@/stores/useSocketStore';

const socketStore = useSocketStore();
const socket = ref(null);
const socketMessage = ref('');
const toast = useToast();

const fetchSockets = async () => {
  await socketStore.connectSocket();
  socket.value = socketStore.socket;
  socketMessage.value = socketStore.message;
};
// Fonction pour gérer les messages reçus
const handleSocketMessage = (data: any) => {
  socketMessage.value = data;
  toast.success(`Message reçu 🎉 : ${data}`, {
    position: POSITION.TOP_CENTER ,// Position du toast
    timeout: 5000, // Durée d'affichage en millisecondes
    closeOnClick: true, // Fermer le toast en cliquant dessus
    pauseOnHover: true, // Mettre en pause le timeout quand la souris est sur le toast
    draggable: true, // Permettre de faire glisser le toast pour le fermer
    draggablePercent: 0.6, // Pourcentage de glissement nécessaire pour fermer le toast
    showCloseButtonOnHover: true, // Afficher le bouton de fermeture au survol
    hideProgressBar: false, // Masquer la barre de progression
    closeButton: 'button', // Utiliser un bouton pour fermer le toast
    icon: false, // Afficher une icône
    rtl: false, // Direction du texte (de gauche à droite)
  });
 
};

// Fonction pour gérer les erreurs de socket
const handleSocketError = (error: any) => {
  console.error('Erreur de socket : ', error);
  toast.error('Une erreur est survenue lors de la connexion au socket.');
};

onMounted(() => {
  fetchSockets();
});

// onUnmounted(() => {
//   // Nettoyer les écouteurs de socket pour éviter les fuites de mémoire
//   socket.off('hello', handleSocketMessage);
//   socket.off('error', handleSocketError);
// });
</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
.flex {
  display: flex;
}
.h-screen {
  height: 100vh;
}
.w1 {
  width: 33.333333%;
}
.border-2 {
  border-width: 2px;
}
.border-blue-500 {
  border-color: #3b82f6;
}
.border-black-500 {
  border-color: #000;
}
.flex-1 {
  flex: 1;
}
</style>