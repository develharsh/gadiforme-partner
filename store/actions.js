import axios from "axios";

export const ACTIONS = {
  NOTIFY: "NOTIFY",
};

export const register = async (payload) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.baseUrl}/partner/add`,
      data: payload,
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};