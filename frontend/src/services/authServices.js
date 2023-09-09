import axios from "axios";

const API_URL = "http://localhost:5050/";
const SignUpApi = async (data) => {
  try {
    const res = await axios.post(API_URL + "auth/signup", data);
    return res;
  } catch (error) {
    return error;
  }
};
const LogInApi = async (data) => {
  try {
    const res = await axios.post(API_URL + "auth/login", data);
    localStorage.setItem("userData", JSON.stringify(await res.data.result));
    localStorage.setItem("token", await res.data.userAuthToken);

    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};
const TokenVerificationApi = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(API_URL + "auth/tokenValidation", { token });

    console.log(await res.data.valid);
    return res;
  } catch (error) {
    return error;
  }
};

export { SignUpApi, LogInApi, TokenVerificationApi };
