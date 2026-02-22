import axios from "axios";

const sendIdTokenToBackend = async (idToken) => {
  try {
    const apiHostUrl = import.meta.env.VITE_APP_HOST_URL; // 예: https://taesae.shop/
    if (!apiHostUrl) {
      throw new Error("VITE_APP_HOST_URL is not set");
    }

    console.log("idToken:", idToken);

    const response = await axios.post(
      `${apiHostUrl}/auth/google`,
      { idToken }, // 여기 정상적인 객체로 보내기
      // {
      //   headers: { "Content-Type": "application/json" },
      //   timeout: 10000,
      // }
    );

    console.log("Login successful:", response.data);
    // localStorage.setItem('accessToken', response.data.token); 
    localStorage.setItem('userId', response.data.user_id);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default sendIdTokenToBackend;