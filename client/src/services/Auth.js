import instance from "../utils/customizeAxios";

export const signIn = async (email, password) => {
  try {
    const response = await instance.post("/api/auth/sign-in", {
      email,
      password,
    });

    if (response.status === 200) {
      return {
        success: true,
        access_token: response.data.access_token,
      };
    } else {
      return {
        success: false,
        error: response.data?.error,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || "SignIn Failed",
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

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        access_token: response.data.access_token,
      };
    } else {
      return {
        success: false,
        error: response.data?.error,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || "SignUp Failed",
    };
  }
};
