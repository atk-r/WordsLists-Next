import { kv } from "@vercel/kv";
import * as bcrypt from "bcrypt";

const saltRounds = 10;

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const exists = await kv.get(username);

  if (exists) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await kv.set(username, { password: hashedPassword });

  return new Response(JSON.stringify({ message: "User signed up!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
