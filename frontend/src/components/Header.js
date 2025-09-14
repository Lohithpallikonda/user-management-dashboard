import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1>
            <Link to="/">
              User Management
            </Link>
          </h1>
          <nav className="nav-buttons">
            <Link to="/" className="nav-button">
              Dashboard
            </Link>
            <Link to="/add-user" className="nav-button success">
              Add User
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;