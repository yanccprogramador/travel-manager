FROM php:8.4-cli-alpine

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apk add --no-cache \
  git \
  unzip \
  libxml2-dev \
  oniguruma-dev \
  sqlite-libs \
  sqlite-dev \
  && docker-php-ext-install pdo pdo_sqlite dom xml

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . /var/www/html

RUN composer install --no-interaction --prefer-dist --no-progress \
  && cp .env.example .env \
  && php artisan key:generate \
  && mkdir -p database \
  && touch database/database.sqlite \
  && php artisan migrate --force

EXPOSE 8000

CMD ["sh", "-c", "php artisan migrate --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=8000"]

