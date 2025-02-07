import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("hello", (arg) => {
//   console.log( "arg",arg);
});


export default socket;