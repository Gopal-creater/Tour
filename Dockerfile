FROM node:21.7.1
WORKDIR /apps
ADD . .
RUN npm install
CMD [ "npm","run","start" ]