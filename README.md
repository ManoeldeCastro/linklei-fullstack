# Linklei

Breve descrição do projeto, explicando o que ele faz e qual problema ele resolve.

## Tecnologias Utilizadas

- **Laravel**: Usado para criar a API do back-end e a lógica de negócios.
- **React**: Utilizado para criar a interface do usuário interativa no front-end.
- **MySQL**: Banco de dados relacional para armazenamento de dados.
- **Bootstrap**: Framework CSS para estilização e componentes responsivos.
- **Docker**: Utilizado para criar um ambiente de desenvolvimento isolado e consistente.

## Recursos

- CRUD de posts: Criação, leitura, atualização e exclusão de posts.
- Upload de imagens: Integração para adicionar imagens aos posts e exibir imagens inseridas no conteúdo.
- Autenticação de usuários: Login e registro de usuários no local storage.
- Validação de dados: No lado do servidor para garantir a integridade dos dados.
- Front-end responsivo: Adaptável a diferentes tamanhos de tela.
- Editor de Texto Rico: Permite aos usuários inserir e formatar o conteúdo dos posts.
- Rolagem Infinita: Carrega mais posts automaticamente à medida que o usuário rola a página.

## Instalação com Docker

Para executar este projeto usando Docker, siga estes passos:

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Copie o arquivo `.env.example` para `.env` e configure suas variáveis de ambiente.
4. Execute `docker-compose up -d` para iniciar os contêineres em background.
5. Acesse o contêiner do app com `docker-compose exec app bash`.
6. Dentro do contêiner, execute `php artisan key:generate`.
7. Execute `php artisan migrate` para criar as tabelas do banco de dados.
8. Acesse a aplicação em `http://localhost:8000`.

## Uso sem Docker

Se preferir executar o projeto sem Docker:

1. Siga os passos de 1 a 6 acima, excluindo os relacionados ao Docker.
2. Instale as dependências do Composer com `composer install`.
3. Instale as dependências do NPM com `npm install` e compile os assets com `npm run dev`.
4. Inicie o servidor de desenvolvimento do Laravel com `php artisan serve`.

## Contribuições

Instruções para contribuir para o projeto, se aplicável.