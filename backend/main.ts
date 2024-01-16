import { Request, Response } from "express";
import connectDB from "./configs/db";
import createServer from "./configs/server";
import userRoute from "./routes/user.route";
import categoryRoute from "./routes/category.route";
import courseRoute from "./routes/course.route.";
import orderRoute from "./routes/order.route";
import communityRoute from "./routes/community.route";
import personalchatRoute from "./routes/personalchat.route";
import paymentRoute from "./routes/payment.route";

// import configureSocketIO from './utils/socket.utils';
import SocketUtils from "./utils/socket.utils";
import CommunityRepository from "./repositories/community.repository";
import PersonalchatRepository from "./repositories/personalchat.repository";
// const app=createServer()
const { app, server, io } = createServer();
const communityRepository = new CommunityRepository();
const personalchatRepository = new PersonalchatRepository();
const socketUtils = new SocketUtils(
  communityRepository,
  personalchatRepository
);
app.get("/", (req: Request, res: Response) => {
  res.send("Allset until now");
});
socketUtils.configureSocketIO(io);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/course", courseRoute);
app.use("/api/order", orderRoute);
app.use("/api/community", communityRoute);
app.use("/api/personal", personalchatRoute);
app.use("/api/payment", paymentRoute);
server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000/");
  connectDB();
});
