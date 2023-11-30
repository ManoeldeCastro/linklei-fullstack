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
    const [loading, setLoading] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [page, setPage] = useState(1);  // Estado para controle de paginação
    const [hasMore, setHasMore] = useState(true);  // Estado para verificar se há mais posts

    const deletePost = (postId) => {
        setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
    };

    useEffect(() => {
        const fetchInitialPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/posts?page=1');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data.data);
                setPage(2);
                setHasMore(data.current_page < data.last_page);
            } catch (error) {
                console.error("Could not fetch posts: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialPosts();
    }, []); 

    const loadMorePosts = async () => {
        if (hasMore && !loading) {
            try {
                const response = await fetch(`/api/posts?page=${page}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(currentPosts => [...currentPosts, ...data.data]); // Atualizado para usar data.data
                setPage(page + 1);
                setHasMore(page < data.last_page); // Verifica se a página atual é menor que a última página
            } catch (error) {
                console.error("Could not fetch posts: ", error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        // Listener de rolagem para carregar mais posts
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                loadMorePosts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMorePosts]);

    useEffect(() => {
        checkLoginStatus();
    }, []);

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
        localStorage.removeItem("user");
    };

    const handleSignupSuccess = () => {
        setIsSignedUp(true);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    
    const handleCloseModal = () => {
        setEditingPost(null);
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
