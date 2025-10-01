import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching users from API
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();

      
      const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");

      
      return [...localUsers, ...userData];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchTerm: "",
    sortBy: "",
    sortOrder: "asc",
  },
  reducers: {
    // Search functionality
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // Sort functionality
    setSortBy: (state, action) => {
      if (state.sortBy === action.payload) {
        // Toggle sort order if same field
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        // Set new field and default to ascending
        state.sortBy = action.payload;
        state.sortOrder = "asc";
      }
    },

    clearSort: (state) => {
      state.sortBy = "";
      state.sortOrder = "asc";
    },

    // Add user functionality
    addUser: (state, action) => {
      const newUser = action.payload;
      state.users.unshift(newUser); // Add to beginning of array

      // Store in localStorage for persistence
      const existingLocalUsers = JSON.parse(
        localStorage.getItem("localUsers") || "[]"
      );
      localStorage.setItem(
        "localUsers",
        JSON.stringify([newUser, ...existingLocalUsers])
      );
    },

    // Update user functionality
    updateUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedData };

        // Update localStorage if it's a local user
        const userId = parseInt(id);
        const currentTime = Date.now();

        if (userId > currentTime - 24 * 60 * 60 * 1000) {
          // This is a local user, update localStorage
          const localUsers = JSON.parse(
            localStorage.getItem("localUsers") || "[]"
          );
          const updatedLocalUsers = localUsers.map((user) =>
            user.id === id ? { ...user, ...updatedData } : user
          );
          localStorage.setItem("localUsers", JSON.stringify(updatedLocalUsers));
        }
      }
    },

    // Delete user functionality
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);

      // Remove from localStorage if it's a local user
      const userIdNum = parseInt(userId);
      const currentTime = Date.now();

      if (userIdNum > currentTime - 24 * 60 * 60 * 1000) {
        // This is a local user, remove from localStorage
        const localUsers = JSON.parse(
          localStorage.getItem("localUsers") || "[]"
        );
        const updatedLocalUsers = localUsers.filter(
          (user) => user.id !== userId
        );
        localStorage.setItem("localUsers", JSON.stringify(updatedLocalUsers));
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setSortBy,
  clearSort,
  addUser,
  updateUser,
  deleteUser,
  clearError,
} = usersSlice.actions;

export default usersSlice.reducer;
