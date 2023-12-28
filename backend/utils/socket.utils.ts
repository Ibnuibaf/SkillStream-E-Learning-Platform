import { Server, Socket } from "socket.io";
import CommunityRepository from "../repositories/community.repository";

class SocketUtils {
  private communityRepository: CommunityRepository;
  constructor(communityRepository: CommunityRepository) {
    this.communityRepository = communityRepository;
  }

  configureSocketIO = async (io: Server) => {
    io.on("connection", (socket: Socket) => {
    //   console.log("A user connected");

      // Joining a Room
      socket.on("join", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room ${roomId}`);
      });

      // Leaving a Room
      socket.on("leave", (roomId) => {
        socket.leave(roomId);
        console.log(`User left room ${roomId}`);
      });

      // Sending and Receiving Messages
      socket.on("send_message", async (data) => {
        const result = await this.communityRepository.addMessageToCommunity(
          data,
          data.roomId
        );
        if (result.success) {
          io.to(data.roomId).emit("receive_message", {
            user: data.user,
            message: data.message,
            image: data.image
          });
        } else {
          console.error(result.message);
        }
      });

    //   socket.on("getChatHistory", async (data) => {
    //     const chatHistory = await this.communityRepository.getChatHistory(
    //       data.roomId
    //     );
    //     io.to(data.roomId).emit("chatHistory", chatHistory); // Use io.emit instead of socket.emit
    //   });

      //   // Typing Indicator
      //   socket.on("typing", (data) => {
      //     socket
      //       .to(data.roomId)
      //       .emit("typing", { user: data.user, isTyping: data.isTyping });
      //   });

      //   // Private Messaging
      //   socket.on("privateMessage", (data) => {
      //     io.to(data.targetUserId).emit("privateMessage", {
      //       sender: data.sender,
      //       message: data.message,
      //     });
      //   });

      // Disconnect
      socket.on("disconnect", () => {
        // console.log("User disconnected");
      });
    });
  };
}

export default SocketUtils;
