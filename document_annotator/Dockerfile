# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.16.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.21
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
