FROM nginx:1.17.10 as proxy
EXPOSE 80
RUN rm /usr/share/nginx/html/*
COPY ./conf/nginx/nginx-prod.conf /etc/nginx/nginx.conf
COPY ./conf/nginx/conf.d/common-locations-prod /etc/nginx/conf.d/common-locations-prod
COPY ./conf/nginx/conf.d/common-locations-dev /etc/nginx/conf.d/common-locations-dev
COPY ./conf/nginx/certs/packrat.cjmoyna.com.cert /etc/pki/tls/certs/packrat.cjmoyna.com.cert
# COPY ./conf/nginx/certs/packrat-test.cjmoyna.com.cert /etc/pki/tls/certs/packrat-test.cjmoyna.com.cert
COPY ./conf/nginx/keys/packratcjmoyna.com.key /etc/pki/tls/private/packrat.cjmoyna.com.key
# COPY ./conf/nginx/keys/packrat-test.cjmoyna.com.key /etc/pki/tls/private/packrat-test.cjmoyna.com.key
CMD ["nginx", "-g", "daemon off;"]
