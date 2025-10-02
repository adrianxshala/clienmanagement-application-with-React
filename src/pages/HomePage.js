import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import {
  fetchUsers,
  setSearchTerm,
  setSortBy,
  clearSort,
  addUser,
} from "../store/userSlice";
import { AddUserForm } from "../components";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error, searchTerm, sortBy, sortOrder } = useSelector(
    (state) => state.users
  );
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter users 
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  // Sort users 
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortBy) return 0;

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

  const handleSort = (field) => {
    dispatch(setSortBy(field));
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleAddUser = (formData) => {
    const newUser = {
      id: Date.now(),
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
    };

    dispatch(addUser(newUser));
    setShowAddForm(false);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleRetry = () => {
    dispatch(fetchUsers());
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading users...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="h6" color="error">
                Error Loading Users
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            </Alert>
            <Button variant="contained" onClick={handleRetry}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 3,
            }}
          >
            <Typography variant="h3" component="h1" color="primary">
              Users Directory
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowAddForm(true)}
              size="large"
            >
              Add New User
            </Button>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Search Section */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
            }}
            sx={{ mb: 2 }}
          />
          {searchTerm && (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} found
            </Typography>
          )}
        </Box>

        {/* Sort Buttons */}
        <Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant={sortBy === "name" ? "contained" : "outlined"}
            startIcon={<SortIcon />}
            onClick={() => handleSort("name")}
            size="small"
          >
            Sort by Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant={sortBy === "email" ? "contained" : "outlined"}
            startIcon={<SortIcon />}
            onClick={() => handleSort("email")}
            size="small"
          >
            Sort by Email {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          {sortBy && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ClearIcon />}
              onClick={() => dispatch(clearSort())}
              size="small"
            >
              Clear Sort
            </Button>
          )}
        </Box>

        {/* Users Grid */}
        <Grid container spacing={3}>
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => handleUserClick(user.id)}
                >
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {user.email}
                    </Typography>
                    <Chip
                      label={user.company.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No users found matching "{searchTerm}"
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Add User Form Modal */}
        {showAddForm && (
          <AddUserForm onAddUser={handleAddUser} onCancel={handleCancelAdd} />
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
