#!/bin/bash -e
docker stop ldap-service phpldapadmin-service
docker rm ldap-service phpldapadmin-service
docker run --name ldap-service --hostname ldap-service -v /var/lib/ldap:/var/lib/ldap -v /etc/ldap/slapd.d:/etc/ldap/slapd.d --net $1 --env-file .env.ldap --detach osixia/openldap:1.1.8
docker run --name phpldapadmin-service --hostname phpldapadmin-service --net $1 --env-file .env.ldap -p 899:80 --detach osixia/phpldapadmin:0.9.0

PHPLDAP_IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" phpldapadmin-service)

echo "Go to: https://$PHPLDAP_IP"
echo "Login DN: cn=admin,dc=cjmonya,dc=com"
echo "Password: Failing-Undrilled-Uncoated6-Carwash-Drank"
