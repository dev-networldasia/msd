FROM php:8.1.2-fpm

# RUN apt-get update && apt-get install -y curl gnupg

RUN docker-php-ext-install pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/api
COPY ./api /var/www/html/api
