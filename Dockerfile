# Use Node.js v16.14.0 as the base image
FROM node:16.14.0

# Create the application directory
RUN mkdir -p /app

# Set the working directory to /app
WORKDIR /app

# Update the package repository and install necessary dependencies
#RUN apt-get update && apt-get install -y vim graphicsmagick optipng jpegoptim libvips-dev && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
COPY package*.json ./

RUN npm install

# Copy the application code into the container
# COPY src/config/env.json ./env.json
COPY . /app

# Install the required Node.js packages
#RUN rm -rf node_modules/sharp && npm install sharp && npm install --force canvas && npm rebuild

# Create a symbolic link for the images directory
#RUN cd /app/public && rm -rf ./uploads && ln -s /data/images uploads

# Expose port 8080 for the application
EXPOSE 8080

# Define the command to start the application
CMD [ "npm", "start" ]
