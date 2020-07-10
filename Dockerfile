# Development
FROM node:10-alpine
WORKDIR /client
COPY package*.json /client/
RUN npm install
ADD . /client/
EXPOSE 3000
CMD ["npm", "start"]
