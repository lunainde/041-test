//client/src/components/PostCard/PostCard.jsx
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box, Chip, Divider, IconButton } from "@mui/material";
// import Tabs from 'src/components/Tabs/Tabs';
function PostCard({ post }) {
  console.log("diogo");
  console.log(post);
  console.log(post.user);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={post.title}
        height="200"
        image={post.imgUrl}
      />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="body2" color="text.secondary">
            {post.user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography gutterBottom variant="h6" component="div" align="left">
          {post.title}
        </Typography>
        <Box mt={2}>
          <Chip
            label={post.tags}
            sx={{ backgroundColor: "#f5f5f5", marginRight: 1 }}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "space-around" }}>
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
  );
}

export default PostCard;
