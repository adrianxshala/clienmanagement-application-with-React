import React, { useState } from "react";

const AddUserForm = ({ onAddUser, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a  user object
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

      onAddUser(newUser);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Add New User</h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h3 style={{ marginBottom: "20px", color: "#2c3e50" }}>
              Basic Information
            </h3>

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name <span style={{ color: "#e74c3c" }}>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className={`form-input ${errors.name ? "error" : ""}`}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email <span style={{ color: "#e74c3c" }}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className={`form-input ${errors.email ? "error" : ""}`}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
              disabled={isSubmitting}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              disabled={isSubmitting}
              style={{ flex: 1 }}
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
