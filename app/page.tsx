"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchAuthorization = async () => {
      const resRaw = await fetch("/api/login", {
        credentials: "same-origin",
      })

      if (!resRaw.ok) {
        setAuthorized(false)
        return
      }

      setAuthorized(true)
    }

    fetchAuthorization()
  }, [])

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)

      const username = formData.get("username")?.toString()
      const password = formData.get("password")?.toString()

      if (!username || !password) throw new Error("Please, fill all the fields")

      console.log(username)
      const resRaw = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const resJson = await resRaw.json()

      if (!resRaw.ok) throw new Error(resJson.message)

      const { message } = resJson

      alert(message)
    } catch (e) {
      console.error(e)

      alert(e + "")
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)

      const username = formData.get("username")?.toString()
      const password = formData.get("password")?.toString()

      if (!username || !password) throw new Error("Please, fill all the fields")

      const resRaw = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const resJson = await resRaw.json()

      if (!resRaw.ok) throw new Error(resJson.message)

      const { message } = resJson

      alert(message)
      window.location.reload()
    } catch (e) {
      console.error(e)

      alert(e + "")
    }
  }
  return (
    <main>
      <h1>login or signup</h1>
      <p>Is authorized: {JSON.stringify(authorized)}</p>
      <p>
        {authorized && (
          <button
            onClick={async () => {
              // remove cookie
              await fetch("/api/logout")
              window.location.reload()
            }}
          >
            Logout
          </button>
        )}
      </p>
      <style jsx>
        {`
          main {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 420px;
            margin: 32px auto;
          }
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 16px 0;
          }
          label {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 8px 0;
          }
          span {
            margin-bottom: 4px;
          }
          input {
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ccc;
          }
          button {
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ccc;
            cursor: pointer;
          }
        `}
      </style>

      <form onSubmit={handleLogin}>
        <label>
          <span>username</span>
          <input name="username" type="text" />
        </label>
        <label>
          <span>password</span>
          <input name="password" type="password" />
        </label>
        <button type="submit">login</button>
      </form>

      <form onSubmit={handleSignUp}>
        <label>
          <span>username</span>
          <input name="username" type="text" />
        </label>
        <label>
          <span>password</span>
          <input name="password" type="password" />
        </label>
        <button type="submit">signup</button>
      </form>
    </main>
  )
}
