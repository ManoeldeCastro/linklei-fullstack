import Post from "./Post";

export const PostList = ({ posts, onDelete, onEdit }) => (
    <div>
        {posts.map((post) => (
            <Post
                key={post.id}
                post={post}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        ))}
    </div>
);
