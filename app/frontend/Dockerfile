 FROM node:16.14-alpine
 WORKDIR /app-frontend
 COPY . /app-frontend/
 EXPOSE 3000
 RUN npm install
 ENTRYPOINT [ "npm", "start" ]