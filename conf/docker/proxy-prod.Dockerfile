FROM linuxserver/swag as swag
EXPOSE 80
EXPOSE 443
COPY ./conf/nginx/nginx-dev.conf /config/nginx/site-confs/default.conf
