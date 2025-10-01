import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2 style={{ color: "#e74c3c" }}>Error Loading Users</h2>
          </div>
          <p style={{ marginBottom: "20px", color: "#7f8c8d" }}>{error}</p>
          <button className="btn" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <div className="container">
          <h1>Users Directory</h1>
          <button className="btn" onClick={() => setShowAddForm(true)}>
            + Add New User
          </button>
        </div>
      </div>

      <div className="container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          {searchTerm && (
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                color: "#7f8c8d",
              }}
            >
              {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          )}
        </div>

        <div className="sort-buttons">
          <button
            className={`btn ${
              sortBy === "name" ? "" : "btn-outline"
            } btn-small`}
            onClick={() => handleSort("name")}
          >
            Sort by Name{" "}
            {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            className={`btn ${
              sortBy === "email" ? "" : "btn-outline"
            } btn-small`}
            onClick={() => handleSort("email")}
          >
            Sort by Email{" "}
            {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          {sortBy && (
            <button
              className="btn btn-secondary btn-small"
              onClick={() => dispatch(clearSort())}
            >
              Clear Sort
            </button>
          )}
        </div>

        <div className="grid grid-3">
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user) => (
              <div
                key={user.id}
                className="card user-card"
                onClick={() => handleUserClick(user.id)}
              >
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
                <div className="user-company">{user.company.name}</div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
              }}
            >
              <p style={{ color: "#7f8c8d", fontSize: "18px" }}>
                No users found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {showAddForm && (
          <AddUserForm onAddUser={handleAddUser} onCancel={handleCancelAdd} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
