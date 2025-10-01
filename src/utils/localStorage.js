import { LOCAL_USERS_KEY } from "./constants";

// Local Storage Utilities
export const localStorageUtils = {
  // Get local users from localStorage
  getLocalUsers: () => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
    } catch (error) {
      console.error("Error parsing local users:", error);
      return [];
    }
  },

  // Save local users to localStorage
  saveLocalUsers: (users) => {
    try {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error("Error saving local users:", error);
    }
  },

  // Add a new local user
  addLocalUser: (user) => {
    const existingUsers = localStorageUtils.getLocalUsers();
    localStorageUtils.saveLocalUsers([user, ...existingUsers]);
  },

  // Update a local user
  updateLocalUser: (userId, updatedData) => {
    const users = localStorageUtils.getLocalUsers();
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updatedData } : user
    );
    localStorageUtils.saveLocalUsers(updatedUsers);
  },

  // Delete a local user
  deleteLocalUser: (userId) => {
    const users = localStorageUtils.getLocalUsers();
    const filteredUsers = users.filter((user) => user.id !== userId);
    localStorageUtils.saveLocalUsers(filteredUsers);
  },
};
