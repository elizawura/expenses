import { Router } from "express";
import { getUsers, registerUser } from "../controllers/user.js";

export const userRouter = Router();

userRouter.post("/users", registerUser);
userRouter.get("/users", getUsers);

export default userRouter;
