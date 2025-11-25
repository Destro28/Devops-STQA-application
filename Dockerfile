# Use Node LTS image as base
FROM node:20

# Create app directory
WORKDIR /app

# Copy backend files
COPY backend/ ./backend/
WORKDIR /app/backend

# Install dependencies
RUN npm install

# Expose app port
EXPOSE 3000

# Default command to run app
CMD ["npm", "start"]
