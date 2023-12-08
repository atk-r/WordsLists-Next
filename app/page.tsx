"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useStyles, theme } from "../styles/styles";
  
export default function Home() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchAuthorization = async () => {
      const resRaw = await fetch("/api/login", {
        credentials: "same-origin",
      });

      if (!resRaw.ok) {
        setAuthorized(false);
        return;
      }

      setAuthorized(true);
    };

    fetchAuthorization();
  }, []);

  const classes = useStyles();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const username = formData.get("username")?.toString();
      const password = formData.get("password")?.toString();

      if (!username || !password)
        throw new Error("Please, fill all the fields");

      console.log(username);
      const resRaw = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resJson = await resRaw.json();

      if (!resRaw.ok) throw new Error(resJson.message);

      const { message } = resJson;

      alert(message);
    } catch (e) {
      console.error(e);

      alert(e + "");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const username = formData.get("username")?.toString();
      const password = formData.get("password")?.toString();

      if (!username || !password)
        throw new Error("Please, fill all the fields");

      const resRaw = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resJson = await resRaw.json();

      if (!resRaw.ok) throw new Error(resJson.message);

      const { message } = resJson;

      alert(message);
      window.location.reload();
    } catch (e) {
      console.error(e);

      alert(e + "");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="div">
              Login or Signup
            </Typography>
            <Typography variant="body2">
              Is authorized: {JSON.stringify(authorized)}
            </Typography>
            {authorized && (
              <Button
                variant="contained"
                onClick={async () => {
                  // remove cookie
                  await fetch("/api/logout");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            )}
            <form onSubmit={handleLogin} className={classes.form}>
              <TextField
                label="Username"
                name="username"
                type="text"
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Login
              </Button>
            </form>

            <form onSubmit={handleSignUp} className={classes.form}>
              <TextField
                label="Username"
                name="username"
                type="text"
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Signup
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
