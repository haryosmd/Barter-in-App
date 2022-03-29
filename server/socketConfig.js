const io = require("socket.io")();
const Redis = require("ioredis");
const sendPushNotification = require("./helpers/sendPushNotification");
const redis = new Redis({
  port: 10199,
  host: "redis-10199.c98.us-east-1-4.ec2.cloud.redislabs.com",
  password: "8e7Ny2t28Zl9oYbsDXCpjwAmhFzuguxq",
});

const messageArray = [];
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("chatMessage", async (message) => {
    messageArray.unshift(message);
    const tokenReceiver = JSON.parse(
      await redis.get(`tokenForId${message.user.receiverId}`)
    );
    sendPushNotification(
      tokenReceiver.token,
      "Message",
      message.text,
      "MyChatRoom",
      message.user._id,
      message.user.recieverName
    );
    socket.broadcast.emit("getMessage", messageArray);
  });
  socket.on("firstConnect", () => {
    socket.emit("getMessage", messageArray);
  });
});

module.exports = io;
