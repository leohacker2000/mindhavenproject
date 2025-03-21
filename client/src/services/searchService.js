import axios from "axios";

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`/users/search?query=${query}`);

    console.log("Search API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    console.error("Error details:", error.response?.data || error.message);

    console.error("Requested URL:", error.config?.url);

    return [];
  }
};
