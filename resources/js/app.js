import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PostList } from './components/PostList';
import { PostCreator } from './components/PostCreator';
import { Header } from './components/Header';
// ... importe outros componentes conforme necessário

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // A URL deve ser a rota da API que retorna os posts.
    // Ajuste a URL se você estiver usando um prefixo diferente ou se o Laravel estiver hospedado em um domínio diferente.
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error("Could not fetch posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = () => {
    // Lógica para abrir formulário de criação de posts ou criar um novo post
  };

  return (
    <div>
      <Header />
      <PostCreator onPostSubmit={handlePostSubmit} />
      <PostList posts={posts} />
      {/* ...outros componentes conforme necessário */}
    </div>
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}