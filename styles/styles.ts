import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
// import { Raleway } from "next/font/google";

// const raleway = Raleway({
//   subsets: ["latin"],
//   display: "swap",
// });

export const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 16, // 16px border radius
  },
  form: {
    "& > *": {
      margin: "8px 0", // 8px vertical spacing
    },
  },
  submitButton: {
    marginTop: 16, // 16px margin top
    width: "100%", // Full width button
  },
}));

export const theme = createTheme({
  typography: {
    fontFamily: "'Raleway', Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#424242",
    },
  },
});
