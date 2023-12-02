# Use an official Node.js runtime as a parent image
FROM node:18.18-alpine 

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Expose the port your app runs on
EXPOSE 3030

# Define the command to run your app using CMD which will start your Node.js application
CMD ["npm", "start"]
