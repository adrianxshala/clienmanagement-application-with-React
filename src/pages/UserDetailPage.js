import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Paper,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { updateUser, deleteUser } from "../store/userSlice";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const findUser = () => {
      try {
        setLoading(true);

        // Check if this is a local user (timestamp-based ID)
        const userId = parseInt(id);
        const currentTime = Date.now();

        // If ID is recent timestamp, it's a local user
        if (userId > currentTime - 24 * 60 * 60 * 1000) {
          // Find in Redux store
          const localUser = users.find((u) => u.id === userId);

          if (localUser) {
            setUser(localUser);
            setEditForm({
              name: localUser.name,
              email: localUser.email,
              phone: localUser.phone || "",
            });
            setError(null);
          } else {
            throw new Error("User not found");
          }
        } else {
          // Find API user in Redux store
          const apiUser = users.find((u) => u.id === userId);

          if (apiUser) {
            setUser(apiUser);
            setEditForm({
              name: apiUser.name,
              email: apiUser.email,
              phone: apiUser.phone || "",
            });
            setError(null);
          } else {
            throw new Error("User not found");
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Error finding user:", err);
      } finally {
        setLoading(false);
      }
    };

    findUser();
  }, [id, users]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
    });
  };

  const handleSaveEdit = () => {
    if (!editForm.name.trim() || !editForm.email.trim()) {
      alert("Name and email are required!");
      return;
    }

    dispatch(
      updateUser({
        id: user.id,
        updatedData: {
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
        },
      })
    );

    setUser({
      ...user,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
    });

    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteUser(user.id));
    setDeleteDialogOpen(false);
    navigate("/");
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading user details...
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
                Error Loading User
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            </Alert>
            <Button variant="contained" onClick={handleBackClick}>
              Back to Users
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="h6">
                User Not Found
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                The requested user could not be found.
              </Typography>
            </Alert>
            <Button variant="contained" onClick={handleBackClick}>
              Back to Users
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header with Actions */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
        >
          Back to Users
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          {!isEditing ? (
            <>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit User
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
              >
                Delete User
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveEdit}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* User Details Card */}
      <Card sx={{ maxWidth: 800, mx: "auto" }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            color: "white",
            p: 4,
            borderRadius: "4px 4px 0 0",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {isEditing ? (
              <TextField
                fullWidth
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                variant="standard"
                InputProps={{
                  sx: {
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "white",
                    "&:before": { borderBottomColor: "rgba(255,255,255,0.3)" },
                    "&:after": { borderBottomColor: "white" },
                  },
                }}
              />
            ) : (
              user.name
            )}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            @{user.username}
          </Typography>
        </Paper>

        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon color="primary" />
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Email
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Button
                    href={`mailto:${user.email}`}
                    startIcon={<EmailIcon />}
                    sx={{ justifyContent: "flex-start", textTransform: "none" }}
                  >
                    {user.email}
                  </Button>
                )}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Phone
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="phone"
                    type="tel"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Button
                    href={`tel:${user.phone}`}
                    startIcon={<PhoneIcon />}
                    sx={{ justifyContent: "flex-start", textTransform: "none" }}
                  >
                    {user.phone}
                  </Button>
                )}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Website
                </Typography>
                <Button
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<LanguageIcon />}
                  sx={{ justifyContent: "flex-start", textTransform: "none" }}
                >
                  {user.website}
                </Button>
              </Box>
            </Grid>

            {/* Address */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationIcon color="primary" />
                Address
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 1 }}>
                <Typography variant="body1">{user.address.street}</Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body1">{user.address.suite}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                  {user.address.city}, {user.address.zipcode}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Coordinates
                </Typography>
                <Chip
                  label={`${user.address.geo.lat}, ${user.address.geo.lng}`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Grid>

            {/* Company */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BusinessIcon color="primary" />
                Company
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {user.company.name}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "text.secondary", mb: 1 }}>
                  "{user.company.catchPhrase}"
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.company.bs}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserDetailPage;
