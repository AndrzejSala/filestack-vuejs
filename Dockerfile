FROM nginx:1.15.7-alpine

MAINTAINER Andrzej Sala <andrzej.sala@outlook.com>

ENV HOST=0.0.0.0
ENV ENVIRONMENT=production


COPY dist /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

EXPOSE 8000