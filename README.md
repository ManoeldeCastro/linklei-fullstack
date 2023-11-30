# Linklei

Descrição breve do projeto, explicando o que ele faz e qual problema ele resolve.

## Tecnologias Utilizadas

- **Laravel**: Usado para criar a API do back-end e a lógica de negócios.
- **React**: Utilizado para criar a interface do usuário interativa no front-end.
- **MySQL**: Banco de dados relacional para armazenamento de dados.
- **Bootstrap**: Framework CSS para estilização e componentes responsivos.
- **Docker** (opcional): Para contêineres de ambiente de desenvolvimento isolados.

## Recursos

- CRUD de posts: Criação, leitura, atualização e exclusão de posts.
- Upload de imagens: Integração para adicionar imagens aos posts e exibir imagens inseridas no conteúdo.
- Autenticação de usuários: Login e registro de usuários no local storage.
- Validação de dados: No lado do servidor para garantir a integridade dos dados.
- Front-end responsivo: Adaptável a diferentes tamanhos de tela.
- Editor de Texto Rico: Permite aos usuários inserir e formatar o conteúdo dos posts.

## Instalação Local

Para executar este projeto localmente, siga estes passos:

1. Clone o repositório

2. Navegue até o diretório do projeto:
cd seu-repositorio

3. Instale as dependências do Composer:
composer install

4. Instale as dependências do NPM:
npm install

5. Compile os assets
npm run dev

6. Crie um arquivo `.env` com base no `.env.example` e configure suas variáveis de ambiente, incluindo as credenciais do banco de dados.

7. Gere uma chave de aplicativo Laravel:
php artisan key:generate

8. Execute as migrações para criar as tabelas do banco de dados:
php artisan migrate

9. Inicie o servidor de desenvolvimento do Laravel:
 ```
 php artisan serve
 ```
10. Acesse a aplicação em `http://localhost:8000`.

## Contribuições

Instruções para contribuir para o projeto, se aplicável.
