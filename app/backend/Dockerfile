FROM node:16.14-alpine

WORKDIR /app-backend

COPY package* ./

RUN npm i --silent

COPY . .

EXPOSE 3001

ENTRYPOINT ["npm", "run"]

CMD ["dev"]