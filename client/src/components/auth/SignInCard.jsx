import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { NavLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import logo from "../../assets/img/logo.png";
import { signIn } from "../../services/Auth";
import { setCookie } from "../../utils/security";
import { ALERT } from "../../utils/Alert";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import "animate.css";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const logo = document.querySelector(".logo-animate");
    if (logo) {
      logo.classList.add(
        "animate__animated",
        "animate__bounceIn",
        "animate__delay-0.2s"
      );
    }

    const title = document.querySelector(".title-animate");
    if (title) {
      title.classList.add(
        "animate__animated",
        "animate__fadeInDown",
        "animate__delay-0.3s"
      );
    }

    const formFields = document.querySelectorAll(".form-field-animate");
    formFields.forEach((field, index) => {
      field.classList.add(
        "animate__animated",
        "animate__fadeInUp",
        `animate__delay-${0.4 + index * 0.1}s`
      );
    });

    const signupLink = document.querySelector(".signup-link-animate");
    if (signupLink) {
      signupLink.classList.add(
        "animate__animated",
        "animate__fadeIn",
        "animate__delay-0.8s"
      );
    }

    const divider = document.querySelector(".divider-animate");
    if (divider) {
      divider.classList.add(
        "animate__animated",
        "animate__fadeIn",
        "animate__delay-0.9s"
      );
    }

    const socialButtons = document.querySelectorAll(".social-button-animate");
    socialButtons.forEach((button, index) => {
      button.classList.add(
        "animate__animated",
        "animate__fadeInUp",
        `animate__delay-${1 + index * 0.1}s`
      );
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    // animation when submit form
    const submitButton = document.querySelector(".submit-button-animate");
    if (submitButton) {
      submitButton.classList.add("animate__animated", "animate__pulse");
    }

    try {
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      const passwd = data.get("password");

      const response = await signIn(email, passwd);
      if (response.success) {
        const userData = {
          email: email,
          role: "user",
        };
        setCookie("access_token", response?.access_token, 10);
        dispatch(
          loginSuccess({ user: userData, token: response.access_token })
        );

        // animation success
        const card = document.querySelector(".card-container");
        if (card) {
          card.classList.remove("animate__bounceInLeft");
          card.classList.add("animate__animated", "animate__fadeOutUp");
          setTimeout(() => {
            ALERT("Successfully", "Welcome back", "success", () => {
              navigate("/");
            });
          }, 500);
        } else {
          ALERT("Successfully", "Welcome back", "success", () => {
            navigate("/");
          });
        }
      } else {
        setPassword("");
        setPasswordError(false);
        setPasswordErrorMessage("");

        ALERT("Login Failed", response.error, "error");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response);
      }

      const card = document.querySelector(".card-container");
      if (card) {
        card.classList.add("animate__animated", "animate__shakeX");
        setTimeout(() => {
          card.classList.remove("animate__shakeX");
        }, 1000);
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;

      // Thêm hiệu ứng rung cho trường email nếu lỗi
      const emailField = document.querySelector(".email-field-animate");
      if (emailField) {
        emailField.classList.add("animate__animated", "animate__headShake");
        setTimeout(() => {
          emailField.classList.remove("animate__headShake");
        }, 1000);
      }
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;

      // Thêm hiệu ứng rung cho trường password nếu lỗi
      const passwordField = document.querySelector(".password-field-animate");
      if (passwordField) {
        passwordField.classList.add("animate__animated", "animate__headShake");
        setTimeout(() => {
          passwordField.classList.remove("animate__headShake");
        }, 1000);
      }
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card variant="outlined" className="card-container ">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <img
          src={logo}
          alt="logo"
          className="logo-animate"
          style={{ width: "50px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        className="title-animate"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl className="form-field-animate email-field-animate">
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl className="form-field-animate password-field-animate">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              className="forgot-password-animate"
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControlLabel
          className="form-field-animate"
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
          className="form-field-animate submit-button-animate"
        >
          Sign in
        </Button>
        <Typography
          sx={{ textAlign: "center" }}
          className="signup-link-animate"
        >
          Don&apos;t have an account?{" "}
          <span>
            <NavLink
              to="/sign-up"
              variant="body2"
              className="animate__animated animate__pulse animate__infinite animate__slower"
              sx={{ alignSelf: "center" }}
            >
              Sign up
            </NavLink>
          </span>
        </Typography>
      </Box>
      <Divider className="divider-animate">or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("SOON")}
          startIcon={<GoogleIcon />}
          className="social-button-animate"
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("SOON")}
          startIcon={<FacebookIcon />}
          className="social-button-animate"
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
}
