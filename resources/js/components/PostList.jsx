import Post  from "./Post";

export const PostList = ({ posts }) => (
  <div>
    {posts.map(post => (
      <Post key={post.id} post={post}  />
    ))}
  </div>
);