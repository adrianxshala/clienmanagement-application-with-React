import { LOCAL_USER_TIME_THRESHOLD } from "./constants";


export const userUtils = {
  
  isLocalUser: (userId) => {
    const userIdNum = parseInt(userId);
    const currentTime = Date.now();
    return userIdNum > currentTime - LOCAL_USER_TIME_THRESHOLD;
  },

  
  generateUserId: () => Date.now(),

  // Create a new user object 
  createNewUser: (formData) => ({
    id: userUtils.generateUserId(),
    name: formData.name,
    email: formData.email,
    phone: formData.phone || "Not provided",
    username: formData.name.toLowerCase().replace(/\s+/g, ""),
    website: "Not provided",
    address: {
      street: "123 Main St",
      suite: "Apt 1",
      city: "Your City",
      zipcode: "12345",
      geo: {
        lat: "0.0000",
        lng: "0.0000",
      },
    },
    company: {
      name: "Personal",
      catchPhrase: "Making the world more connected!",
      bs: "personal services",
    },
  }),

  // Filter users
  filterUsers: (users, searchTerm) => {
    if (!searchTerm) return users;

    const searchLower = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  },

  // Sort users 
  sortUsers: (users, sortBy, sortOrder) => {
    if (!sortBy) return users;

    return [...users].sort((a, b) => {
      let aValue, bValue;

      if (sortBy === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortBy === "email") {
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  },
};
