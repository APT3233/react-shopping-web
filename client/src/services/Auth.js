import instance from "../utils/customizeAxios";

export const signIn = async (email, password) => {
  try {
    const response = await instance.post("/api/auth/sign-in", {
      email,
      password,
    });
    return {
      success: true,
      access_token: response.data.access_token,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "SignIn Failed",
    };
  }
};

export const signUp = async (name, email, password) => {
  try {
    const response = await instance.post("/api/auth/sign-up", {
      name,
      email,
      password,
    });
    return {
      success: true,
      access_token: response.data.access_token,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "SignUp Failed",
    };
  }
};
