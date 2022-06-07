import React,{useState} from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import Paper from "@mui/material/Paper";
import { CenterFocusStrong, Rectangle } from "@mui/icons-material";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import logo from "../../assets/pics/—Pngtree—glasses man sending message and_5478887.png";
import "./Signup-student.css";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { signup } from "../../api/auth";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 30,
      fontFamily: ["Noto Sans Thai", "sans-serif"].join(","),
    },
    body1: {
      fontSize: 20,
      fontFamily: ["Noto Sans Thai", "sans-serif"].join(","),
    },
  },
});
const useStyles = makeStyles({
  boxuser: {
    marginLeft: -500.5,
    marginTop: -124,
    width: 150,
    height: 65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    backgroundColor: "#69F0AE",
  },
  boxcom: {
    marginLeft: -340,
    marginTop: -124,
    width: 150,
    height: 65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    backgroundColor: "#69F0AE",
    opacity: 0.7,
  },
});

export default function Signupuser() {
  const classes = useStyles()

  const [form, setForm] = useState({
    email: "",
    cfemail: "",
    password: "",
    cfpassword: "",
    role: "student"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // ใช้ setform เซ็ตข้อมูล โดย ...form  => ดึงตัวแปรข้อมูลทั้งหมดมา
    // [e.target.name]: e.target.value => set ค่า value ตาม name
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.cfpassword) {
      toast.error("password not match");
    } else {
      signup(form)
        .then((res) => {
          console.log(res);
          toast("Register Success!");
          navigate("/")
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err.response.data)
        });
    }
  }
  return (
    // ลองใช้ mui
    <ThemeProvider theme={theme}>
      <Grid className="layout">
        {/* รูปฝั่งซ้าย */}
        <Grid className="image">
          <Box className="image" component={"img"} src={logo} />
        </Grid>
        {/* ฟอร์มแถบขาว */}
        <Box
          id="white-form"
          sx={{
            width: 600,
            height: 450,
            my: 30,
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
              sx={{ mt: 2, width: 450 }}
            >
              <form className="container" onSubmit={handleSubmit}>
              <TextField
                className="e-mail"
                margin="normal"
                // ดอกจัน
                // required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                required
                onChange={handleChange}
              />
              <TextField
                className="cfe-mail"
                margin="normal"
                // ดอกจัน
                // required
                fullWidth
                id="cfemail"
                label="Confirm E-mail"
                name="cfemail"
                autoComplete="email"
                sx={{ mt: 2 }}
                variant="outlined"
                required
                onChange={handleChange}
              />
              <TextField
                className="password"
                margin="normal"
                // ดอกจัน
                // required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ mt: 2 }}
                variant="outlined"
                required
                onChange={handleChange}
              />
              <TextField
                className="cfpassword"
                margin="normal"
                // ดอกจัน
                // required
                fullWidth
                name="cfpassword"
                label="Confirm Password"
                type="password"
                id="cfpassword"
                autoComplete="current-password"
                sx={{ mt: 2 }}
                variant="outlined"
                required
                onChange={handleChange}
              />

              <Button
                className="button-login"
                style={{
                  borderRadius: 20,
                  backgroundColor: "#24AB82",
                  padding: "10px 36px",
                  fontSize: "18px",
                  boxShadow: 20,
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, color: "white" }}
              >
                <Typography variant="subtitle1">สมัครสมาชิก</Typography>
              </Button>
              </form>
            </Box>
          </Grid>
        </Box>

        <Grid>
          {/* หัวข้อแถบเขียว */}
          <Box
            className="green"
            sx={{
              width: 600,
              height: 120,
              my: -101,
              mx: 95,
              backgroundColor: "#69F0AE",
              borderTopRightRadius: "20px",
              textAlign: "center",
              // paddingTop: 0
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1">
              <Box sx={{ fontWeight: 800, textAlign: "center" }}>
                ลงทะเบียนสำหรับนักศึกษาจบใหม่
              </Box>
            </Typography>

            {/* ปุ่มด้านบน */}

            {/* เปลี่ยนไปหน้าuser */}
            <a href="/signupstudent" class="text-decoration-none">
              <Box className={classes.boxuser}>
                <Button
                  className={classes.btnuser}
                  sx={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    width: 150,
                    height: 65,
                    color: "black",
                  }}
                >
                  <PersonIcon fontSize="large" />
                  <Typography variant="body1">นักศึกษา</Typography>
                </Button>
              </Box>
            </a>

            {/* เปลี่ยนไปหน้า company */}
            <a href="/signupcompany" class="text-decoration-none">
              <Box className={classes.boxcom}>
                <Button
                  className={classes.btnuser}
                  sx={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    width: 150,
                    height: 65,
                    color: "black",
                  }}
                >
                  <BusinessIcon fontSize="large" />
                  <Typography variant="body1">บริษัท</Typography>
                </Button>
              </Box>
            </a>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
                }
