import express, { Request, Response } from "express";

const Router = express.Router();

Router.post("/create", (req: Request, res: Response) => {
  console.log(req.body);
//   console.log(req);
});

export default Router;
