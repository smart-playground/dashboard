# pull official base image
FROM node:13.12.0-alpine
# FROM node:19.2-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# RUN npm install --production
# RUN npm install --silent
# RUN npm install react-scripts@5.0.1 -g --silent
RUN npm install react-scripts@5.0.1 -g

# add app
COPY . ./

EXPOSE 80

# start app
CMD ["npm", "start"]