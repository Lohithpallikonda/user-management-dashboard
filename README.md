# User Management Dashboard

A full-stack web application for managing users with CRUD (Create, Read, Update, Delete) operations. Built with React.js frontend and Node.js/Express backend with SQLite database.

## 🚀 Tech Stack

**Frontend:**
- React.js (Functional components with Hooks)
- React Router DOM (Client-side routing)
- Axios (HTTP requests)
- Custom CSS (Responsive design)

**Backend:**
- Node.js
- Express.js (REST API)
- SQLite (Database)
- CORS (Cross-origin resource sharing)

## ✨ Features

- **User Management**: Create, read, update, and delete users
- **Search Functionality**: Search users by name, email, or company
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant updates when users are added/edited/deleted
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback

## 📋 User Fields

Each user contains the following information:
- Name (required)
- Email (required, unique)
- Phone
- Company
- Street Address
- City
- ZIP Code
- Latitude
- Longitude

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd user-management-dashboard/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd user-management-dashboard/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## 📱 API Endpoints

### Users API (`/api/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Example API Usage

**Get all users:**
```bash
curl -X GET http://localhost:8080/api/users
```

**Create a new user:**
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "company": "TechCorp",
    "city": "New York"
  }'
```

**Update a user:**
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "123-456-7890",
    "company": "TechCorp",
    "city": "New York"
  }'
```

**Delete a user:**
```bash
curl -X DELETE http://localhost:8080/api/users/1
```

## 🏗️ Project Structure

```
user-management-dashboard/
├── backend/
│   ├── routes/
│   │   └── users.js          # User API routes
│   ├── database.js           # SQLite database setup
│   ├── server.js             # Express server configuration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.js     # Navigation header
│   │   ├── pages/
│   │   │   ├── UserList.js   # User dashboard with search
│   │   │   └── UserForm.js   # Add/Edit user form
│   │   ├── App.js            # Main app with routing
│   │   └── index.css         # Custom styles
│   └── package.json
└── README.md
```

## 🎯 Application Flow

1. **Dashboard**: View all users in a table with search functionality
2. **Add User**: Click "Add User" to create a new user
3. **Edit User**: Click "Edit" next to any user to modify their information
4. **Delete User**: Click "Delete" to remove a user (with confirmation)
5. **Search**: Use the search bar to filter users by name, email, or company

## 🔧 Development Features

- **Hot Reload**: Both frontend and backend support hot reloading during development
- **Error Handling**: Comprehensive error messages for debugging
- **Validation**: Form validation on both client and server sides
- **CORS Enabled**: Frontend and backend can communicate across different ports

## 🚀 Deployment

### Backend Deployment
1. Set the PORT environment variable
2. Ensure SQLite database file is writable
3. Install production dependencies: `npm install --production`
4. Start the server: `npm start`

### Frontend Deployment
1. Build the production version: `npm run build`
2. Serve the built files using a web server
3. Update API endpoints to point to your deployed backend

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Test the following functionality:
   - View the user list (should be empty initially)
   - Add a new user using the "Add User" button
   - Search for users using the search bar
   - Edit a user by clicking the "Edit" link
   - Delete a user by clicking the "Delete" button

## 🔍 Features Demonstrated

✅ **Frontend (React)**
- Functional components with hooks (useState, useEffect, useCallback)
- React Router for navigation
- Axios for API calls
- Form handling and validation
- Search functionality
- Responsive design

✅ **Backend (Node.js/Express)**
- RESTful API design
- SQLite database integration
- CRUD operations
- Error handling
- CORS configuration
- Input validation

✅ **Full-Stack Integration**
- Frontend-backend communication
- Real-time data updates
- Error handling across the stack
- Consistent data flow

## 📝 Assignment Requirements Met

- ✅ React.js with functional components and hooks
- ✅ React Router DOM for navigation
- ✅ Axios for HTTP requests
- ✅ Node.js/Express backend
- ✅ SQLite database
- ✅ CRUD operations
- ✅ Form validation
- ✅ Error handling
- ✅ Responsive design
- ✅ Search functionality

## 🎉 Screenshots

The application includes:
- A clean, professional user interface
- Responsive design that works on all screen sizes
- Intuitive navigation and user experience
- Real-time feedback for user actions

---

**Built by:** [Your Name]
**Date:** 2024
**Assignment:** Forty4 Tech Full-Stack Developer Assessment