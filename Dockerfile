### Development container build #####################################
FROM node:latest as builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build


### Production container build #####################################
FROM nginx:alpine

# Overwrite default nginx config
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy artifacts from the Stage 2
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
