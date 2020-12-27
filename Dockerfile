FROM node:alpine
WORKDIR /app/
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist/ /usr/share/nginx/html/
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD nginx -g "daemon off;"
