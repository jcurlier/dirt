FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

CMD [ "npm", "start" ]
