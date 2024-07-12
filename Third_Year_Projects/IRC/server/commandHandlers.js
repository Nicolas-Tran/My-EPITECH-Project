module.exports = {
  //done
  /* Handle nick command */
  nick: (username, args, channel, io, channels, socket) => {
    if (channels[channel] && channels[channel][socket.id]) {
      channels[channel][socket.id] = args[0];
      io.to(channel).emit(
        "new message",
        "Your new name is",
        channels[channel][socket.id]
      );
    }
  },

  //done
  /* Handle list command */
  list: (username, args, channel, io, channels, socket) => {
    if (channels[channel] && channels[channel][socket.id]) {
      var list = "";
      if (args[0]) {
        for (let key in channels) {
          if (key.includes(args[0])) list += key + `, `;
        }
      } else {
        for (let key in channels) {
          list += key + ", ";
        }
      }
      io.to(channel).emit("new message", "List of channel enable", list);
    }
  },

  //need to fix (create new one when giving the same name)
  /* Handle create command */
  create: (username, args, channel, io, channels, socket) => {
    channel = args[0];
    if (!channels[channel]) {
      channels[channel] = {};
    }
    channels[channel][socket.id] = username;
    socket.join(channel);
    io.to(channel).emit("new user", username, channel);
    console.log(`new user "${username}" on ${channel} channel.`);
  },

  //done
  /* Handle delete command */
  delete: (username, args, channel, io, channels, socket) => {
    if (channels[args[0]]) {
      delete channels[args[0]];
      io.to(channel).emit("new message", "Channel deleted", args[0]);
    }
  },

  /* Handle join command */
  join: (username, args) => {
    console.log("join"); /* Handle join command */
  },

  //done
  /* Handle quit command */
  quit: (username, args, channel, io, channels, socket) => {
    if (channels[args[0]]) {
      io.to(args[0]).emit("user left", username, args[0]);
      socket.leave(args[0]);
      delete channels[args[0]][socket.id];
      console.log(`${username} left ${args[0]}.`);
    }
  },

  //done
  /* Handle users command */
  users: (username, args, channel, io, channels, socket) => {
    var list = "";
    for (let key in channels[channel]) {
      list += channels[channel][key] + ", ";
    }
    // console.log(channels[channel])
    io.to(channel).emit("new message", "Members in the channel", list);
  },

  //need private send
  /* Handle msg command */
  msg: (username, args, channel, io, channels, socket) => {
    let message = "";
    let check = 0;
    for (let key in channels[channel]) {
      if (channels[channel][key] === args[0]) check = 1;
    }

    if (check == 0) {
      for (index in args) message += args[index] + " ";
      io.to(channel).emit("new message", username, message);
    } else {
      let message = "";
      let socketId = "";
      if (args.length > 1) {
        for (let i = 1; i < args.length; i++) {
          message += args[i] + " ";
        }
        if (channels[channel]) {
          for (let key in channels[channel]) {
            if (channels[channel][key] === args[0]) {
              socketId = key;
            }
          }
          if (socketId) {
            socket.to(socketId).emit("new message", username, message);
          } else {
            console.log("User not found in channel: " + channel);
          }
        } else {
          console.log("Channel not found: " + channel);
        }
      }
    }
  },
};
