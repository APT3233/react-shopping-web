import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Spin } from "antd";
import { getPassByEmail } from "../../services/Auth";
import instance from "../../utils/customizeAxios";

function ForgotPassword({ open, handleClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const inputRefs = useRef([]);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const emailValue = formData.get("email");
    setEmail(emailValue);

    try {
      const response = await getPassByEmail(emailValue);
      if (response.success) {
        setKey(response.key);
        console.log("Key from server:", response.key);
        setStep(2);
      } else {
        alert(response.error || "Failed to send password reset email");
      }
    } catch (error) {
      alert("An error occurred while sending the password reset email");
    } finally {
      setIsLoading(false); 
    }
  };

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);

    const enteredCode = code.join("");
    if (enteredCode === key) {
      setIsCorrect(true);
      setTimeout(() => {
        setStep(3);
        setIsLoading(false); 
      }, 500);
    } else {
      setIsCorrect(false);
      setIsLoading(false); 
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await instance.post("/api/auth/reset-password", {
        email: email,
        password: newPassword,
      });

      if (response.status >= 200 && response.status < 300) {
        const data = await response.data;
        alert(data.message || "Password reset successfully!");
        handleClose();
      } else {
        const errorData = await response.data;
        alert(errorData.error || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        alert(
          errorData.error || "An error occurred while resetting the password."
        );
      } else if (error.request) {
        alert(
          "No response from the server. Please check your network connection."
        );
      } else {
        alert("Méo biết lỗi giề. Đừng thử nữa");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    if (value && !/^[0-9]$/.test(value)) {
      event.target.value = "";
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    const enteredCode = code.join("");
    if (enteredCode.length === 6) {
      if (enteredCode === key) {
        setIsCorrect(true);
        setTimeout(() => setStep(3), 500);
      } else {
        setIsCorrect(false);
      }
    } else {
      setIsCorrect(null);
    }
  }, [code, key]);

  const renderStep1 = () => (
    <>
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account's email address, and we'll send you a link to reset
          your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          autoComplete="off"
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spin /> : "Continue"}
        </Button>
      </DialogActions>
    </>
  );

  const renderStep2 = () => (
    <>
      <DialogTitle>Enter Verification Code</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          We've sent a 6-digit verification code to {email}. Please enter it
          below:
        </DialogContentText>
        <Box
          component="form"
          onSubmit={handleCodeSubmit}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "350px",
            mx: "auto",
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextField
              key={index}
              variant="outlined"
              inputRef={(el) => (inputRefs.current[index] = el)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center" },
                type: "tel",
              }}
              autoComplete="off"
              value={code[index]}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              sx={{
                width: "70px",
                "& .MuiOutlinedInput-root": {
                  height: "60px",
                  width: "50px",
                  "& fieldset": {
                    borderColor:
                      isCorrect === null ? "grey" : isCorrect ? "green" : "red",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      isCorrect === null ? "grey" : isCorrect ? "green" : "red",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor:
                      isCorrect === null ? "grey" : isCorrect ? "green" : "red",
                  },
                  animation: isCorrect === false ? "shake 0.5s" : "none",
                },
              }}
              required
            />
          ))}
        </Box>
        <style>
          {`
            @keyframes shake {
              0% { transform: translateX(0); }
              25% { transform: translateX(-5px); }
              50% { transform: translateX(5px); }
              75% { transform: translateX(-5px); }
              100% { transform: translateX(0); }
            }
          `}
        </style>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={() => setStep(1)} disabled={isLoading}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleCodeSubmit}
          disabled={isLoading}
        >
          Verify
        </Button>
      </DialogActions>
    </>
  );

  const renderStep3 = () => (
    <>
      <DialogTitle>Reset Your Password</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: "500px",
        }}
      >
        <DialogContentText>Enter your new password below:</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="new-password"
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ maxWidth: "400px", mx: "auto" }}
        />
        <TextField
          required
          margin="dense"
          id="confirm-password"
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ maxWidth: "400px", mx: "auto" }}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={() => setStep(2)} disabled={isLoading}>
          Back
        </Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          Reset Password
        </Button>
      </DialogActions>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit:
            step === 1
              ? handleEmailSubmit
              : step === 3
              ? handlePasswordSubmit
              : handleCodeSubmit,
          sx: { backgroundImage: "none" },
        },
      }}
    >
      {step === 1 ? renderStep1() : step === 2 ? renderStep2() : renderStep3()}
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
