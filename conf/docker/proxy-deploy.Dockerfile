FROM nginx:1.17.10 as proxy
EXPOSE 80
RUN rm /usr/share/nginx/html/*
COPY ./conf/nginx/nginx-deploy.conf /etc/nginx/nginx.conf
COPY ./conf/nginx/conf.d/common-locations-prod /etc/nginx/conf.d/common-locations-prod
COPY ./conf/nginx/conf.d/common-locations-dev /etc/nginx/conf.d/common-locations-dev
COPY ./conf/nginx/certs/packrat.cjmoyna.int.cert /etc/pki/tls/certs/packrat.cjmoyna.int.cert
# COPY ./conf/nginx/certs/packrat-test.cjmoyna.int.cert /etc/pki/tls/certs/packrat-test.cjmoyna.int.cert
COPY ./conf/nginx/keys/packrat.cjmoyna.int.key /etc/pki/tls/private/packrat.cjmoyna.int.key
# COPY ./conf/nginx/keys/packrat-test.cjmoyna.int.key /etc/pki/tls/private/packrat-test.cjmoyna.int.key
CMD ["nginx", "-g", "daemon off;"]
