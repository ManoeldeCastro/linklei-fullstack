# Use a imagem oficial do PHP com Apache
FROM php:7.4-apache

# Instale extensões do PHP
RUN docker-php-ext-install pdo pdo_mysql

# Copie os arquivos da aplicação para o container
COPY . /var/www/html

# Dê permissões adequadas aos arquivos e diretórios
RUN chown -R www-data:www-data /var/www/html

# Exponha a porta 8000
EXPOSE 8000

# Use o comando para iniciar o Apache
CMD ["apache2-foreground"]