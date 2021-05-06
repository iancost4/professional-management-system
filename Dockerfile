FROM node:14.15.4-alpine

WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY . /app/
EXPOSE 3333

RUN ["chmod", "+x", "/app/init.sh"]
CMD [ "/app/init.sh" ]