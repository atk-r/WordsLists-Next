import { kv } from "@vercel/kv";
import * as bcrypt from "bcrypt";
import type * as types from "../../../types/db";

const saltRounds = 10;

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!(await kv.get("users"))) {
    await kv.set("users", []);
  }
  const users: types.Users = (await kv.get("users")) as types.Users;
  const exists = users[users.findIndex((_user) => _user.username === username)];

  if (exists) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const updatedUsers: types.Users = [
    ...users,
    { username: username, password: hashedPassword, wordlists: [] },
  ];
  await kv.set("users", updatedUsers);

  return new Response(JSON.stringify({ message: "User signed up!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
