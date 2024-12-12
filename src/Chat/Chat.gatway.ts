

import { Injectable } from "@nestjs/common";
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@Injectable()

@WebSocketGateway({
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST"],
        credentials: true,
    },
})

export class ChatGateway implements OnGatewayInit {
    private clients: Map<string, Socket> = new Map();

    @WebSocketServer() server: Server;
    jwtService: any;

    async afterInit() {
        console.log("Chat Gateway Initialized");
    }



    async handleConnection(client: Socket) {
        try {
            this.clients.set(client.id, client);
            console.log(`Client connected: ${client.id}`);
            console.log(`Total connected clients: ${this.clients.size}`);
        } catch (err) {
            console.log(err);
        }
    }

    async handleDisconnect(client: Socket) {
        try {
            this.clients.delete(client.id);
            console.log(`Client disconnected: ${client.id}`);
            console.log(`Total connected clients: ${this.clients.size}`);
        } catch (err) {
            console.log(err);
        }
    }

    // Join a specific room
    @SubscribeMessage('join_room')
    async joinRoom(
        @MessageBody() data: { room: string },
        @ConnectedSocket() client: Socket
    ) {
        try {
            const { room } = data;
            client.join(room); // Join the specified room
            console.log(`Client ${client.id} joined room: ${room}`);
            client.emit('joined_room', { room, message: 'You have joined the room' });
        } catch (err) {
            console.log(err);
        }
    }


    @SubscribeMessage('leave_room')
    async leaveRoom(
        @MessageBody() data: { room: string },
        @ConnectedSocket() client: Socket
    ) {
        try {
            const { room } = data;
            client.leave(room); // Leave the specified room
            console.log(`Client ${client.id} left room: ${room}`);
            client.emit('left_room', { room, message: 'You have left the room' });
        } catch (err) {
            console.log(err);
        }
    }


    @SubscribeMessage('send_message')
    async sendMessage(
        @MessageBody() data: { room: string; message: string; sender: string; token: string },
        @ConnectedSocket() client: Socket
    ) {
        const { room, message, sender, token } = data;
        console.log(data)

        try {
            if (!token) throw new Error('Token is missing');

            // Verify token
            // const payload = await this.jwtService.verifyAsync(token, {
            //     secret: jwtConstants.secret,
            // });
            // console.log('Verified Payload:', payload);

            // Broadcast the message to the specified room
            this.server.to(room).emit('receive_msg', { sender, message, room });
            console.log(`Message sent to room ${room} by ${sender}: ${message}`);
        } catch (error) {
            console.error('Error in sendMessage:', error.message);
            client.emit('error', { message: 'Authentication failed' });
        }
    }

}



















// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const Chat = () => {
//     const [socket, setSocket] = useState(null);
//     const [room, setRoom] = useState("");
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);
//     const [username, setUsername] = useState("User1");

//     useEffect(() => {
//         // Connect to the WebSocket server
//         const newSocket = io("http://localhost:3000"); // Replace with your server URL
//         setSocket(newSocket);

//         // Listen for messages
//         newSocket.on("receive_msg", (data) => {
//             setMessages((prev) => [...prev, data]);
//         });

//         return () => newSocket.close(); // Cleanup on component unmount
//     }, []);

//     const joinRoom = () => {
//         if (socket && room) {
//             socket.emit("join_room", { room });
//         }
//     };

//     const leaveRoom = () => {
//         if (socket && room) {
//             socket.emit("leave_room", { room });
//             setRoom(""); // Clear the room input
//         }
//     };

//     const sendMessage = () => {
//         if (socket && message) {
//             socket.emit("send_message", {
//                 room,
//                 message,
//                 sender: username,
//                 token: "your-jwt-token", // Replace with a valid JWT token
//             });
//             setMessage(""); // Clear the message input
//         }
//     };

//     return (
//         <div style= {{ padding: "20px" }
// }>
//     <h2>Chat App </h2>
//         < div >
//         <input
//           type="text"
// placeholder = "Your username"
// value = { username }
// onChange = {(e) => setUsername(e.target.value)}
// style = {{ marginRight: "10px" }}
//         />
//     < input
// type = "text"
// placeholder = "Room"
// value = { room }
// onChange = {(e) => setRoom(e.target.value)}
//         />
//     < button onClick = { joinRoom } disabled = {!room}>
//         Join Room
//             </button>
//             < button onClick = { leaveRoom } disabled = {!room}>
//                 Leave Room
//                     </button>
//                     </div>

//                     < div style = {{ marginTop: "20px" }}>
//                         <input
//           type="text"
// placeholder = "Message"
// value = { message }
// onChange = {(e) => setMessage(e.target.value)}
//         />
//     < button onClick = { sendMessage } disabled = {!room || !message}>
//         Send
//         </button>
//         </div>

//         < div style = {{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
//             <h3>Messages </h3>
// {
//     messages.map((msg, index) => (
//         <p key= { index } >
//         <strong>{ msg.sender } </strong>: {msg.message} (Room: {msg.room})
//         </p>
//     ))
// }
// </div>
//     </div>
//   );
// };

// export default Chat;
