FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./

RUN npm i -g yarn

RUN yarn
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

RUN yarn run tsc

EXPOSE 4000

ENV NODE_ENV production

CMD [ "yarn", "start" ]