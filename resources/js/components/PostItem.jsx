export const PostItem = ({ post }) => (
  <article>
    <div>
      <p>{post.author}</p>
    </div>
    <div>
      <p>{Date(post.updatedAt)}</p>
    </div>
    <div>
      <p>{post.content}</p>
    </div>
    <div>
      {/* Imagem do post, se houver */}
    </div>
    <div>
      <button>Editar</button>
    </div>
  </article>
);