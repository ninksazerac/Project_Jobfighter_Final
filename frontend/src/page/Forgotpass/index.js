import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Rectangle } from "@mui/icons-material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import logo from "../../assets/pics/Lovepik_com-401693242-office-girl.png";
import "./Forgotpass.css";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    email: data.get("email"),
    password: data.get("password"),
  });
};
const notosan1 = createTheme({
  typography: {
    subtitle1: {
      fontSize: 50,
      fontFamily: ["Noto Sans Thai", "sans-serif"].join(","),
    },
    body1: {
      fontSize: 30,
      fontFamily: ["Noto Sans Thai", "sans-serif"].join(","),
    },
    body2: {
      fontSize: 18,
      fontWeight: 500,
      fontFamily: ["Noto Sans Thai", "sans-serif"].join(","),
    },
  },
});

export default function Forgotpass() {
  return (
    // ลองใช้ mui
    <ThemeProvider theme={notosan1}>
      <Grid id="layout">
        <Grid className="image">
          <Box
            className="image"
            component={"img"}
            src={logo}
            sx={{
              mt: 15,
            }}
          />
        </Grid>

        {/* ฟอร์มแถบขาว */}
        <Box
          className="white-form"
          sx={{
            width: 600,
            height: 450,
            my: 25,
            mx: 95,
            backgroundColor: "white",
            // display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 20,
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          {/* จัดรูปแบบที่จะกรอก */}
          <Grid
            id="form"
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              id="form-write"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: 450, marginTop: 4 }}
            >
              <Typography variant="body2" align="center">
                กรุณากรอกอีเมลที่คุณลงทะเบียนไว้
              </Typography>
              <Typography variant="body2" align="center">
                ระบบจะส่งลิงก์ไปยังอีเมลเพื่อให้คุณตั้งรหัสผ่านใหม่
              </Typography>
              <TextField
                className="e-mail"
                margin="normal"
                // required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                id="button-login"
                style={{
                  borderRadius: 20,
                  backgroundColor: "#24AB82",
                  padding: "10px 36px",
                  fontSize: "18px",
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2, color: "white" }}
              >
                <Typography variant="body1">ส่ง</Typography>
              </Button>
            </Box>
          </Grid>
        </Box>

        {/* หัวข้อแถบเขียน */}
        <Box
          className="green-form"
          sx={{
            width: 600,
            height: 120,
            my: -96,
            mx: 95,
            backgroundColor: "#69F0AE",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            textAlign: "center",
            // paddingTop: 0
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1">
            <Box sx={{ fontWeight: 700 }}>ลืมรหัสผ่าน</Box>
          </Typography>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
