import { apiRequest } from "./api";

export const fetchUserRepositories = (userId) => {
  return apiRequest(`/repo/user/${userId}`);
};
