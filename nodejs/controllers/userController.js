import { users } from "../models/userModel.js";
const createUser = (req, res) => {
  res.send("This is post request of user router");
};

const getUsers = (req, res) => {
  res.json(users)
};

export { getUsers, createUser };
