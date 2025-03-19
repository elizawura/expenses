import bcrypt from "bcrypt";
import { loginUserValidator, userValidator } from "../validators/user.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { error, value } = userValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // console.log("value", value);
  const existingUser = await User.findOne({ email: value.email });
  console.log("existingUser", existingUser);

  if (existingUser) {
    return res.status(409).json({ message: "User already Registered" });
  } else {
    const hashedPassword = await bcrypt.hash(value.password, 12);
    const newUser = await User.create({
      userName: value.userName,
      email: value.email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  }
};

export const getUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json({ data: allUsers });
};

export const loginUser = async (req, res, next) => {
  //validate user information
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // find matching user record in database
  const existingUser = await User.findOne({ email: value.email });
  if (!existingUser) {
    return res.status(404).json("user does not exists");
  }
  //compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(
    value.password,
    existingUser.password
  );
  if (!correctPassword) {
    return res.status(401).json("invalid credentials");
  }
  //generate access token for user
  const accessToken = jwt.sign(
    { id: existingUser.id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
  //return response
  res.status(200).json({ accessToken });
};
