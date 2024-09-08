FROM php:8.3-fpm-alpine

LABEL maintainer="Avtandil Chachanidze <chachanidze29m@gmail.com>"

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
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl \
    && rm -rf /var/cache/apk/*

COPY . /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install --optimize-autoloader --no-dev

RUN npm ci \
    && npm run build \
    && rm -rf public/storage \
    && php artisan storage:link \
    && php artisan cache:clear \
    && php artisan optimize \
    && php artisan migrate:fresh --seed

EXPOSE 9000

CMD ["php-fpm"]
