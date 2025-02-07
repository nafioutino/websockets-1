import { defineStore } from "pinia";
import { ref } from "vue";
import { io } from "socket.io-client";

export const useSocketStore = defineStore("socket", () => {
    const socket = ref();
    const message = ref('');

    // Fonction pour initialiser la connexion Socket.io
    const connectSocket = () => {
        // Initialisation de la connexion Socket.io
        socket.value = io("http://localhost:4000");


        // Écoute de l'événement 'hello'
        socket.value.on("hello", (arg: any) => {
            console.log("arg", arg);
            message.value = arg;
        });
    };

    const emitEvent = (event: string, data: any) => {
        socket.value.emit(event, data);
    }

    return {
        socket,
        message,
        connectSocket,
        emitEvent
    };
});
