// client/src/pages/ArticlePage/ArticlePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ArticlePage.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box, Chip, Divider, IconButton, Avatar } from "@mui/material";


const ArticlePage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div>
  
    <Card className="center" sx={{ 
      maxWidth: 1200,
      }}>
      <CardMedia
        component="img"
        alt={post.title}
        height="600"
        image={post.imgUrl} />
    
      <CardContent>
        <Box display="flex">
          <Avatar
            src={post.user.imgUrl}
            alt={post.user.name}
            sx={{
          width: "80px !important",
          height: "80px !important",
          border: "1px solid black",
          borderRadius: "0 !important",
          marginRight: "1rem",
          }}
          />
          <Box>
            <Typography variant="body2" color="text.secondary" textAlign="left" mb="16px">
              {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
            <Typography textAlign="left" >{post.user.name}</Typography>
            <Typography textAlign="left" >{post.user.headline}</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2}} />

        <Typography
          my="24px"
          gutterBottom
          variant="h3"
          component="div"
          align="left"
          className="title-height" >
          {post.title}
        </Typography>

        <Typography
          my="24px"
          gutterBottom
          variant="h6"
          component="div"
          align="left"
          className="title-height">
          {post.content}
        </Typography>

      </CardContent>
      
      <Box mt={2}>
          {post.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{ backgroundColor: "#f5f5f5", marginRight: 1 }} />
          ))}
      </Box>
      <Divider sx={{ mt: 3 }}/>
      <CardActions
        className="bottom-fix"
        sx={{ justifyContent: "space-around", marginTop: "auto" }}
      >
        <IconButton>
          <ThumbUpOutlinedIcon />
        </IconButton>
        <IconButton>
          <BookmarkBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <ShareOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>

  </div>
  );
};

export default ArticlePage;


