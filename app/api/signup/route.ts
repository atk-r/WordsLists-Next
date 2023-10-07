import { kv } from "@vercel/kv"

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const exists = await kv.get(username)

  if (exists) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  await kv.set(username, password)

  return new Response(JSON.stringify({ message: "User signed up!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
