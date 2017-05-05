FROM node

# Create app directory
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

# Bundle app source
COPY . /usr/src/server

# Install app dependencies
RUN npm install -g gulp nodemon
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]