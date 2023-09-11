FROM linuxserver/swag as proxy
EXPOSE 80
EXPOSE 443
COPY ./conf/nginx/nginx-dev.conf /config/nginx/site-confs/default.conf
COPY ./conf/nginx/conf.d/common-locations-prod /config/nginx/conf.d/common-locations-prod
COPY ./conf/nginx/conf.d/common-locations-dev /config/nginx/conf.d/common-locations-dev
