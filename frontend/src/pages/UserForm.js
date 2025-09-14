import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    street: '',
    city: '',
    zipcode: '',
    lat: '',
    lng: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`);
      setUser(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user details');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchUser();
    }
  }, [isEditing, fetchUser]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${id}`, user);
        setSuccess('User updated successfully!');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, user);
        setSuccess('User created successfully!');
        setUser({
          name: '',
          email: '',
          phone: '',
          company: '',
          street: '',
          city: '',
          zipcode: '',
          lat: '',
          lng: ''
        });
      }

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save user');
      console.error('Error saving user:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing && !user.name) {
    return (
      <div className="main-content">
        <div className="loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading user details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Hero Section */}
      <div className="dashboard-header">
        <h1 className="page-title">
          {isEditing ? 'Edit User' : 'Add New User'}
        </h1>
        <p className="page-subtitle">
          {isEditing
            ? 'Update user information and save changes to keep your team data current.'
            : 'Add a new team member to your dashboard with all their essential details.'
          }
        </p>
      </div>

      <div className="form-container">
        <div className="form-card">
          <div className="form-title">
            {isEditing ? 'Update User Profile' : 'Create User Profile'}
          </div>
          <div className="form-subtitle">
            {isEditing
              ? `Editing ${user.name || 'user'}'s information`
              : 'Fill in the details below to add a new team member'
            }
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={user.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={user.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Company */}
              <div className="form-group">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={user.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter company name"
                />
              </div>

              {/* Street */}
              <div className="form-group">
                <label htmlFor="street" className="form-label">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={user.street}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter street address"
                />
              </div>

              {/* City */}
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={user.city}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter city"
                />
              </div>

              {/* ZIP Code */}
              <div className="form-group">
                <label htmlFor="zipcode" className="form-label">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={user.zipcode}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter ZIP code"
                />
              </div>

              {/* Empty space for grid alignment */}
              <div></div>

              {/* Latitude */}
              <div className="form-group">
                <label htmlFor="lat" className="form-label">
                  Latitude (Optional)
                </label>
                <input
                  type="text"
                  id="lat"
                  name="lat"
                  value={user.lat}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter latitude coordinates"
                />
              </div>

              {/* Longitude */}
              <div className="form-group">
                <label htmlFor="lng" className="form-label">
                  Longitude (Optional)
                </label>
                <input
                  type="text"
                  id="lng"
                  name="lng"
                  value={user.lng}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter longitude coordinates"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading
                  ? (isEditing ? 'Updating...' : 'Creating...')
                  : (isEditing ? 'Update User' : 'Create User')
                }
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;