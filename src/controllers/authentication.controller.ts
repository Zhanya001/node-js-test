import UsersService from "@/services/users.service";
import type { RequestHandler } from "express";
import { signJwt, verifyPassword } from "utils";

// Login Controller
const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UsersService.getUserByField("username", username);
    if (!user)
      // No reveal if user exists or not for security reasons
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await verifyPassword(password, user.password);
    if (!match) {
      // No reveal if the password is incorrect or not for security reasons
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signJwt({ id: user.id });
    const { password: _, status: _status, ...userWithoutPassword } = user;
    return res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while login" });
  }
};

const me: RequestHandler = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await UsersService.getUserByField("id", Number(id));
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password: _, status: _status, ...userWithoutPassword } = user;
    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting user" });
  }
};
const AuthenticationController = Object.freeze({
  login,
  me,
} as const satisfies Record<string, RequestHandler>);

export default AuthenticationController;
