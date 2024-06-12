//client/src/pages/PostsPage/PostsPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostsPage.css";
import PostCard from "../../components/PostCard/PostCard";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts`
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="posts-page">
      <h1>All Posts</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;

/*
 <div key={post._id} className="post-item">
    <h2>{post.title}</h2>
    <img src={post.imgUrl} alt={post.title} />
    <p>{post.content}</p>
    <p>
      <strong>Author:</strong> {post.author.name}
    </p>
  </div>
*/
