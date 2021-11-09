# ### Development container build #####################################
FROM node:14 as builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build:dev


### Production container build #####################################
FROM nginx:mainline-alpine AS production

# Overwrite default nginx config
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy artifacts from the build stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
