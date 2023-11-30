import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { PostList } from "./components/PostList";
import { PostCreator } from "./components/PostCreator";
import { Header } from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import Login from "./components/login";



const App = () => {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState(null);

    const deletePost = (postId) => {
        setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
      };

    const checkLoginStatus = () => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
        }
    };
    const onEdit = (postToEdit) => {
        setEditingPost(postToEdit);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("user"); // Remove o usuário do localStorage
      };
    

    useEffect(() => {
      checkLoginStatus()
        if (true) {
            const fetchPosts = async () => {
                try {
                    const response = await fetch("/api/posts");
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        );
                    }
                    const data = await response.json();
                    setPosts(data);
                } catch (error) {
                    console.error("Could not fetch posts: ", error);
                }
            };

            fetchPosts();
            setLoading(false)
        }
    }, [isLoggedIn]);
    const handleCloseModal = () => {
        setEditingPost(null);
    };

    const handleSignupSuccess = () => {
        setIsSignedUp(true);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handlePostSubmit = (newOrUpdatedPost, action) => {
        if (action === 'edit') {
            setPosts(currentPosts =>
                currentPosts.map(post => 
                    post.id === newOrUpdatedPost.id ? newOrUpdatedPost : post
                )
            );
        } else {
            setPosts(currentPosts => [...currentPosts, newOrUpdatedPost]);
        }
        setEditingPost(null); // Reseta o post em edição
    };
    
    if(loading) {
      return <p>Carregando...</p>
    }

    return (
        <div className="container card">
            {!isLoggedIn ? (
                !isSignedUp ? (
                    <Signup onSignupSuccess={handleSignupSuccess} />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
            ) : (
                <>
                    <Header onLogout={handleLogout}/>
                    <PostCreator onPostSubmit={handlePostSubmit} editingPost={editingPost} onClose={handleCloseModal} />
                    <PostList posts={posts} onDelete={deletePost} onEdit={onEdit}/>
                </>
             )}
        </div>
    );
};

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
