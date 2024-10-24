
import axios from "axios";

export const get = async (url) => {
  console.log("url", url);

  try {
    const response = await axios.get(url, {
      withCredentials: true, // Include cookies with the request
    });

    return response.data; // Return data directly from the response
  } catch (error) {
    const errorMsg = error.response?.data?.message || "An error occurred.";
    console.error("Error occurred during GET request:", error);
    throw new Error(errorMsg); // Throw error with a readable message
  }
};
export const post = async (url, values) => {
  console.log("url", url);
  console.log("values", values);

  try {
    const response = await axios.post(url, values, {
      withCredentials: true, 
    });

    return response.data; // Return data directly from the response
  } catch (error) {
    // Handle error responses
    const errorMsg = error.response?.data?.message || "An error occurred.";
    console.error("Error occurred during POST request:", error);
    throw new Error(errorMsg); // Throw error with a readable message
  }
};
export const patch = async (url, values) => {
  console.log("url", url);
  console.log("values", values);

  try {
    const response = await axios.patch(url, values, {
      withCredentials: true, // Include cookies with the request
    });

    return response.data; // Return data directly from the response
  } catch (error) {
    const errorMsg = error.response?.data?.message || "An error occurred.";
    console.error("Error occurred during PATCH request:", error);
    throw new Error(errorMsg); // Throw error with a readable message
  }
};

export const deleteItem = async (url) => {
  console.log("url", url);

  try {
    const response = await axios.delete(url, {
      withCredentials: true, // Include cookies with the request
    });

    return response.data; // Return data directly from the response
  } catch (error) {
    const errorMsg = error.response?.data?.message || "An error occurred.";
    console.error("Error occurred during DELETE request:", error);
    throw new Error(errorMsg); // Throw error with a readable message
  }
};



export const verifyToken = async (token) => {
  console.log("Verifying token:", token);

  try {
    const response = await axios.post("http://localhost:5000/admin/auth/verify-token", {}, {
      headers: {
        Authorization: `${token}`, // Gửi token dưới dạng Bearer token
      },
      withCredentials: true, // Bao gồm cookies trong yêu cầu
    });

    return response.data; // Mong đợi { valid: true/false }
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Token verification failed.";
    console.error("Error occurred during token verification:", error);
    throw new Error(errorMsg); // Ném lỗi với thông điệp dễ đọc
  }
};

