import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppTheme from "../../components/ui/shared-theme/AppTheme";
import ColorModeSelect from "../../components/ui/shared-theme/ColorModeSelect";
import {
  GoogleIcon,
  FacebookIcon,
} from "../../components/ui/shared-theme/customizations/CustomIcons";
import logo from "../../assets/img/logo.png";
import { setCookie } from "../../utils/security";
import { signUp } from "../../services/Auth";
import { ALERT } from "../../utils/Alert";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import 'animate.css';
import { Spin } from "antd";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
  animation: "fadeInDown 0.8s",
}));

const AnimatedLogo = styled('img')({
  width: "50px", 
  cursor: "pointer",
  animation: "pulse 1s infinite",
});

const AnimatedButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  '&:hover': {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  '&::after': {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "5px",
    height: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    opacity: "0",
    borderRadius: "100%",
    transform: "scale(1, 1) translate(-50%)",
    transformOrigin: "50% 50%",
  },
  '&:active::after': {
    opacity: "1",
    width: "100%",
    height: "100%",
    transform: "scale(0, 0) translate(-50%)",
    transition: "0s",
  },
});

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

// Animated form element wrapper
const AnimatedFormControl = styled(FormControl)(({ delay = 0 }) => ({
  animation: `fadeInUp 0.5s ease ${delay}s both`,
  opacity: 0,
}));

const AnimatedTypography = styled(Typography)({
  animation: "fadeIn 1s ease-in",
});

export default function SignUp(props) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimate(true);
  }, []);

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    setLoading(true)
    // Add button animation on submit
    const submitButton = event.currentTarget.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.classList.add('animate__animated', 'animate__pulse');
    }
    
    try {
      const data = new FormData(event.currentTarget);

      const name = data.get("name");
      const email = data.get("email");
      const password = data.get("password");

      const response = await signUp(name, email, password);
      if (response.success) {
        // setCookie("access_token", response?.access_token, 10);
        // const dataUser = {
        //   email: email,
        //   role: 'user'
        // };
        // dispatch(loginSuccess({user: dataUser, token: response.access_token}));
        ALERT("SignUp Successfully", "Please login !", "success", () => {
          navigate("/sign-in");
        });
      } else {
        // Add shake animation for error
        const formElement = event.currentTarget;
        formElement.classList.add('animate__animated', 'animate__shakeX');
        setTimeout(() => {
          formElement.classList.remove('animate__animated', 'animate__shakeX');
        }, 1000);
        
        ALERT("Failed", response.error, 'error');
      }
    } catch (error) {
      console.log(error);
    } finally { 
      setLoading(false)
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" className={animate ? "animate__animated animate__fadeIn" : ""}>
          <AnimatedLogo
            src={logo}
            alt="logo"
            className="animate__animated animate__bounceIn"
            onClick={() => navigate("/")}
          />
          <AnimatedTypography
            component="h1"
            variant="h4"
            className="animate__animated animate__fadeInDown"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {loading ? <Spin /> : "Sign up"}
          </AnimatedTypography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            className="animate__animated animate__fadeIn"
          >
            <AnimatedFormControl delay={0.1}>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
                className={nameError ? "animate__animated animate__shakeX" : ""}
              />
            </AnimatedFormControl>
            <AnimatedFormControl delay={0.2}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
                className={emailError ? "animate__animated animate__shakeX" : ""}
              />
            </AnimatedFormControl>
            <AnimatedFormControl delay={0.3}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
                className={passwordError ? "animate__animated animate__shakeX" : ""}
              />
            </AnimatedFormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
              className="animate__animated animate__fadeIn animate__delay-4s"
            />
            <AnimatedButton
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              className="animate__animated animate__fadeInUp animate__delay-5s"
            >
              Sign up
            </AnimatedButton>
          </Box>
          <Divider className="animate__animated animate__fadeIn animate__delay-6s">
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box 
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            className="animate__animated animate__fadeIn animate__delay-7s"
          >
            <AnimatedButton
              fullWidth
              variant="outlined"
              onClick={() => alert("SOON")}
              startIcon={<GoogleIcon />}
              className="animate__animated animate__fadeInUp animate__delay-8s"
            >
              Sign up with Google
            </AnimatedButton>
            <AnimatedButton
              fullWidth
              variant="outlined"
              onClick={() => alert("SOON")}
              startIcon={<FacebookIcon />}
              className="animate__animated animate__fadeInUp animate__delay-9s"
            >
              Sign up with Facebook
            </AnimatedButton>
            <Typography 
              sx={{ textAlign: "center" }}
              className="animate__animated animate__fadeIn animate__delay-1s"
            >
              Already have an account?{" "}
              <NavLink
                to="/sign-in"
                variant="body2"
                sx={{ alignSelf: "center" }}
                className="animate__animated animate__pulse animate__infinite"
              >
                Sign in
              </NavLink>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}