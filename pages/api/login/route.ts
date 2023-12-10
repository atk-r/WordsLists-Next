import { sign, verify } from "jsonwebtoken";
import { kv } from "@vercel/kv";
import * as bcrypt from "bcrypt";
import type * as types from "../../../types/db";

const saltRounds = 10;

export async function POST(req: Request) {
  const data: { username: string; password: string } = await req.json();
  const users: types.Users | null = await kv.get("users");

  if (users) {
    const user = users[users.findIndex(user => user.username === data.username)];

    if (user && (await bcrypt.compare(data.password, user.password))) {
      // Secret key to sign the token
      const secretKey = process.env.JWT_SECRET as string;

      // Create a JWT token
      const userIndex = String(
        users.findIndex((_user) => _user === user)
      );
      const token = sign(userIndex, secretKey, { expiresIn: "14d" }); // Expires in 7 days

      const res = new Response(
        JSON.stringify({ message: "Authentication successful" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie":
              "authToken=" +
              token +
              "; HttpOnly; Path=/; SameSite=Strict; Max-Age=86400",
          },
        }
      );

      return res;
    } else {
      return new Response(
        JSON.stringify({ message: "Authentication failed" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } else {
    await kv.set("users", []);
    return new Response(JSON.stringify({ message: "Authentication failed" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function GET(req: Request) {
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
      return new Response(JSON.stringify({ message: "Authorization failed" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const res = new Response(
        JSON.stringify({ message: "Authorization successful" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res;
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Authorization failed" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
