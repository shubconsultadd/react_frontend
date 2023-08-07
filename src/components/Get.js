import axios from "axios";
export const getUser = async ({ token }) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const res = await axios.get(`http://127.0.0.1:8000/backend/get_user_data`);
    return res.data;
  } catch (error) {}
};