import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
      setUsers(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Hero Section */}
      <div className="dashboard-header">
        <h1 className="page-title">User Dashboard</h1>
        <p className="page-subtitle">
          Manage your users with a clean and intuitive interface.
          Search, add, edit, and organize your team members efficiently.
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-icon">⌕</div>
        <input
          type="text"
          placeholder="Search users by name, email, or company..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {/* Main Dashboard Card */}
      <div className="dashboard-card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Team Members</h2>
            <p className="card-description">
              {filteredUsers.length} of {users.length} users displayed
            </p>
          </div>
        </div>

        <div className="table-container">
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <h3 className="empty-state-title">
                {searchTerm ? 'No users found' : 'No users yet'}
              </h3>
              <p className="empty-state-description">
                {searchTerm
                  ? 'Try adjusting your search terms to find what you\'re looking for.'
                  : 'Get started by adding your first team member to the dashboard.'
                }
              </p>
              {!searchTerm && (
                <Link to="/add-user" className="btn btn-primary" style={{marginTop: '1.5rem', display: 'inline-block'}}>
                  Add Your First User
                </Link>
              )}
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: '500', color: '#1d1d1f' }}>
                            {user.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6e6e73' }}>
                            ID #{user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#1d1d1f', fontWeight: '400' }}>
                        {user.email}
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#6e6e73' }}>
                        {user.phone || '—'}
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#1d1d1f', fontWeight: '400' }}>
                        {user.company || '—'}
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#6e6e73' }}>
                        {user.city || '—'}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/edit-user/${user.id}`}
                          className="action-button edit"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="action-button delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Stats */}
      {users.length > 0 && (
        <div className="stats-container">
          <div className="stats">
            Showing {filteredUsers.length} of {users.length} total users
            {searchTerm && ` • Filtered by "${searchTerm}"`}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;