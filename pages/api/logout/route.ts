export async function GET() {
  // Destroy session
  return new Response(JSON.stringify({ message: "Logout successful" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "authToken=; HttpOnly; Path=/; SameSite=Strict; Max-Age=-1",
    },
  })
}
