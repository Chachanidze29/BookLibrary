FROM php:8.3-fpm-alpine

LABEL maintainer="Avtandil Chachanidze <chachanidze29m@gmail.com>"

ARG WWWGROUP

WORKDIR /var/www/html

RUN apk add --no-cache \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    oniguruma-dev \
    autoconf \
    build-base \
    libzip-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    icu-dev \
    bash \
    nginx \
    nodejs \
    npm

RUN docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl

RUN rm -rf /var/cache/apk/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www/html

RUN composer install --optimize-autoloader --no-dev

COPY package.json package-lock.json ./
RUN npm ci
RUN npm run build

COPY ./public /var/www/html/public

RUN mkdir -p storage/framework/cache/data \
    && mkdir -p storage/framework/sessions \
    && mkdir -p storage/framework/views \
    && chmod -R gu+w storage \
    && chmod -R guo+w storage \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

RUN php artisan cache:clear

EXPOSE 9000

CMD ["php-fpm"]
