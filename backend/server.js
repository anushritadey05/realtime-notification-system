require("dotenv").config();
const { setIO } = require("./src/socket");
const http = require("http");
const jwt = require("jsonwebtoken");

const app = require("./src/app");

const { Server } = require("socket.io");

const pool = require("./src/db/db");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

setIO(io);

io.on("connection", (socket) => {

  try {

    // get token from socket auth
    const token = socket.handshake.auth.token;

    // verify token
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // create private room
    const userRoom = `user_${verified.id}`;

    socket.join(userRoom);

    console.log(
      `User ${verified.id} joined room ${userRoom}`
    );

    socket.emit("new_notification", {
      message: "Connected to private realtime room"
    });

    socket.on("disconnect", () => {

      console.log("User disconnected");

    });

  } catch (error) {

    console.log("Socket auth failed");

    socket.disconnect();

  }

});
const PORT = process.env.PORT || 5000;

pool.connect()
  .then(() => {

    console.log("PostgreSQL Connected");

    server.listen(PORT, () => {

      console.log(`Server running on port ${PORT}`);

    });

  })
  .catch((err) => {

    console.log(err);

  });