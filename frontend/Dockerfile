# Use Node.js as the base image for building the React app
FROM node:20.14 as build

# Set the working directory inside the container
WORKDIR /personal-task-manager/

# Copy package.json and package-lock.json to install dependencies
COPY personal-task-manager/package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire frontend source code
COPY personal-task-manager/ ./

# Build the React app for production
RUN npm run build

# Use Nginx as the base image for serving the built app
FROM nginx:alpine

# Copy the built React files from the previous stage to Nginx's default HTML directory
COPY --from=build /personal-task-manager/dist /usr/share/nginx/html

# Expose port 80 (Nginx default port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]