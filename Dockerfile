# Dockerfile

# Use the official Node.js image from Docker Hub
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app
RUN npm install

# Copy the rest of the application code into the container
COPY . /app

# Expose the port (but don't hard-code it, use the one from environment variables)
EXPOSE ${PORT}

# Command to run the app, using the environment variables for PORT and NAME
CMD ["node", "src/app.js"]
