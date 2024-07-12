const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const port = 8000;

const MongoClient = require("mongodb").MongoClient;
const url =
  "YOUR_MONGO_LINK";
let db;

MongoClient.connect(url, (err, client) => {
  if (err) { 
    console.log(err);
    throw err;
  }
  db = client.db("Cluster0"); // specify the database you want to use
  console.log("Connected to MongoDB");
});

// Keep track of connected users and channels
let connectedUsers = {};
let channels = {};

const commandHandlers = require("./commandHandlers");

io.on("connection", (socket) => {
  // Handle user joining a channel
  socket.on("join", (channel, username) => {
    console.log(channel);
    if (!channels[channel]) {
      channels[channel] = {};
    }
    channels[channel][socket.id] = username;
    socket.join(channel);
    io.to(channel).emit("new user", username, channel);
    console.log(`new user "${username}" on ${channel} channel.`);

    //save the new user in mongodb
    db.collection("users").insertOne({ channel: channel, username: username, joined_at: new Date() }, (err, res) => {
      if (err) throw err;
      console.log("1 document inserted");
    });
  });

  // Handle user leaving a channel
  socket.on("leave", (channel, username) => {
    if (channels[channel] && channels[channel][socket.id]) {
      const username = channels[channel][socket.id];
      io.to(channel).emit("user left", username, channel);
      socket.leave(channel);
      delete channels[channel][socket.id];
      console.log(`${username} left ${channel}.`);

      //delete the user from mongodb
      db.collection("users").deleteOne({ channel: channel, username: username }, (err, obj) => {
        if (err) throw err;
        console.log("1 document deleted");
      });
    }
  });

  // Handle user sending a message
  socket.on("message", (channel, message) => {
    if (
      channels[channel] &&
      channels[channel][socket.id] &&
      message.startsWith("/")
    ) {
      const username = channels[channel][socket.id];
      const [command, ...args] = message.slice(1).split(" ");
      if (command in commandHandlers) {
        commandHandlers[command](username, args, channel, io, channels, socket);
      }
    } else if (channels[channel] && channels[channel][socket.id]) {
      const username = channels[channel][socket.id];
      io.to(channel).emit("new message", username, message);
      console.log(`${channel}:"${username}": ${message}`);

      //save the message in mongodb
      db.collection("messages").insertOne({ channel: channel, username: username, message: message, sent_at: new Date() }, (err, res) => {
        if (err) throw err;
        console.log("1 message inserted");
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
