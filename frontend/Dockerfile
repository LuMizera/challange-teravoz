FROM node:latest
LABEL mantainer="LuMizera"
LABEL version="1.0"
WORKDIR /var/www/frontend
COPY package.json /var/www/frontend
EXPOSE 3000
CMD [ "./build-front.sh" ]