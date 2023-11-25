import { PostItem } from "./PostItem";

export const PostList = ({ posts }) => (
  <div>
    {posts.map(post => (
      <PostItem key={post.id} post={post} />
    ))}
  </div>
);