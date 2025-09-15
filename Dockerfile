# Dockerfile for containerized deployment (Heroku, DigitalOcean, etc.)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
COPY api/package*.json ./api/

# Install root dependencies
RUN npm install

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies and build
WORKDIR /app/frontend  
RUN npm install
RUN npm run build

# Install API dependencies
WORKDIR /app/api
RUN npm install

# Copy all source code
WORKDIR /app
COPY . .

# Expose port
EXPOSE 8080

# Start backend server (serves both API and frontend static files)
WORKDIR /app/backend
CMD ["npm", "start"]