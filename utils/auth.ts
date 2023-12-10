import { sign, verify } from "jsonwebtoken";
import { kv } from "@vercel/kv";
import type * as types from "../types/db";

export const auth = (req: Request) => {
  try {
    const token = req.headers
      .get("cookie")
      ?.split(";")
      .find((c) => c.trim().startsWith("authToken="))
      ?.split("=")[1];

    if (!token) throw new Error("No token provided");

    const decoded = verify(token, process.env.JWT_SECRET as string); // index of the user in users
    const userIndex = Number(decoded); // use later

    if (!decoded) {
      return { success: false };
    } else {
      return { success: true, data: userIndex };
    }
  } catch (err) {
    return { success: false };
  }
};

export const getUserData = async (userIndex: number) => {
  const users: types.Users = (await kv.get("users")) as types.Users;
  const userData = users[userIndex];
  return userData;
};