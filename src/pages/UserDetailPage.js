import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

  useEffect(() => {
    const findUser = () => {
      try {
        setLoading(true);

        
        const userId = parseInt(id);
        const currentTime = Date.now();

       
        if (userId > currentTime - 24 * 60 * 60 * 1000) {
          
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

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      dispatch(deleteUser(user.id));
      navigate("/");
    }
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
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2 style={{ color: "#e74c3c" }}>Error Loading User</h2>
          </div>
          <p style={{ marginBottom: "20px", color: "#7f8c8d" }}>{error}</p>
          <button className="btn" onClick={handleBackClick}>
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2 style={{ color: "#e74c3c" }}>User Not Found</h2>
          </div>
          <p style={{ marginBottom: "20px", color: "#7f8c8d" }}>
            The requested user could not be found.
          </p>
          <button className="btn" onClick={handleBackClick}>
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <button className="btn btn-outline" onClick={handleBackClick}>
            ← Back to Users
          </button>

          <div style={{ display: "flex", gap: "10px" }}>
            {!isEditing ? (
              <>
                <button className="btn btn-outline" onClick={handleEdit}>
                   Edit User
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: "#e74c3c" }}
                  onClick={handleDelete}
                >
                   Delete User
                </button>
              </>
            ) : (
              <>
                <button className="btn" onClick={handleSaveEdit}>
                  Save Changes
                </button>
                <button className="btn btn-outline" onClick={handleCancelEdit}>
                   Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="user-detail-header">
            <div className="user-detail-title">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    background: "transparent",
                    border: "2px solid rgba(255,255,255,0.3)",
                    color: "white",
                  }}
                />
              ) : (
                user.name
              )}
            </div>
            <div className="user-detail-subtitle">@{user.username}</div>
          </div>

          <div style={{ padding: "30px" }}>
            <div className="grid grid-3">
              <div className="detail-section">
                <h3>Contact Information</h3>
                <div className="detail-item">
                  <div className="detail-label">Email</div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <a
                      href={`mailto:${user.email}`}
                      className="detail-value detail-link"
                    >
                      {user.email}
                    </a>
                  )}
                </div>
                <div className="detail-item">
                  <div className="detail-label">Phone</div>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <a
                      href={`tel:${user.phone}`}
                      className="detail-value detail-link"
                    >
                      {user.phone}
                    </a>
                  )}
                </div>
                <div className="detail-item">
                  <div className="detail-label">Website</div>
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-value detail-link"
                  >
                    {user.website}
                  </a>
                </div>
              </div>

              <div className="detail-section">
                <h3> Address</h3>
                <div className="detail-item">
                  <div className="detail-value">{user.address.street}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-value">{user.address.suite}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-value">
                    {user.address.city}, {user.address.zipcode}
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Coordinates</div>
                  <div className="detail-value">
                    {user.address.geo.lat}, {user.address.geo.lng}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3> Company</h3>
                <div className="detail-item">
                  <div
                    className="detail-value"
                    style={{ fontSize: "1.1rem", fontWeight: "600" }}
                  >
                    {user.company.name}
                  </div>
                </div>
                <div className="detail-item">
                  <div
                    className="detail-value"
                    style={{ fontStyle: "italic", color: "#7f8c8d" }}
                  >
                    "{user.company.catchPhrase}"
                  </div>
                </div>
                <div className="detail-item">
                  <div
                    className="detail-value"
                    style={{ fontSize: "0.9rem", color: "#95a5a6" }}
                  >
                    {user.company.bs}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
