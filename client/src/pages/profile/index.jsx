import { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";
import { Box, Alert, Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export default function Profile() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Auth status:", isAuthenticated);
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: "",
          justifyContent: "center",
          p: 4,
          textAlign: "center",
          maxWidth: "70%",
          margin: "0 auto"
        }}
      >
        <Alert severity="warning">
          You must be logged in to view your profile. Please sign in to
          continue.
        </Alert>
        <br/>
        <br/>
        <br/>
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
          Loading
        </Stack>
      </Box>
    );
  }

  return <UserProfile userEmail={user?.email} />;
}
