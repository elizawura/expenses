import { Router } from "express";
import { getUsers, loginUser, registerUser } from "../controllers/user.js";

export const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);
userRouter.get("/users", getUsers);

export default userRouter;
