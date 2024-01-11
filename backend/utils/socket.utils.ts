import { Server, Socket } from "socket.io";
import CommunityRepository from "../repositories/community.repository";
import PersonalchatRepository from "../repositories/personalchat.repository";

class SocketUtils {
  private communityRepository: CommunityRepository;
  private personalchatRepository: PersonalchatRepository;
  constructor(
    communityRepository: CommunityRepository,
    personalchatRepository: PersonalchatRepository
  ) {
    this.communityRepository = communityRepository;
    this.personalchatRepository = personalchatRepository;
  }

  configureSocketIO = async (io: Server) => {
    io.on("connection", (socket: Socket) => {
      // console.log("A user connected");

      // Joining a Room
      socket.on("join", async (details) => {
        const chatDetails = await this.personalchatRepository.findPersonalchat(
          details
        );
        if (chatDetails.personalchat) {
          socket.join(`${chatDetails.personalchat?._id}`);
          console.log(`User joined room ${chatDetails.personalchat?._id} `);
        }
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
            image: data.image,
          });
        } else {
          console.error(result.message);
        }
      });
      socket.on("send_personal_message", async (data) => {
        const result =
          await this.personalchatRepository.addMessageToPersonalchat(
            data,
            data.roomId
          );
        console.log(data);

        if (result.success) {
          io.to(data.roomId).emit("receive_personal_message", {
            user: data.user,
            message: data.message,
            image: data.image,
          });
        } else {
          console.error(result.message);
        }
      });

      // Disconnect
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  };
}

export default SocketUtils;
