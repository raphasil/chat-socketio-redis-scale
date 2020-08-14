FROM node

# Create app directory
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

# Bundle app source
COPY . /usr/src/client

# Install app dependencies
RUN npm install -g gulp nodemon
RUN npm install
RUN gulp setup-prod

EXPOSE 3001
CMD [ "npm", "start" ]