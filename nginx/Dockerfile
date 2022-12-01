FROM nginx:alpine
WORKDIR /etc/nginx
RUN rm ./conf.d/*
COPY ./nginx.conf ./conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]
