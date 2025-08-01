const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log("क्लायंट कनेक्ट झाला:", socket.id);

  socket.on("send_message", (data) => {
    console.log("मेसेज:", data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("क्लायंट डिस्कनेक्ट:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("सर्व्हर सुरू आहे: http://localhost:3001");
});
