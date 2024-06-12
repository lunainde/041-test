//client/src/components/UserCard/UserCard.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import UserAvatar from './UserAvatar';
import './UserCard.css';

const UserCard = ({ user }) => {
  if (!user) {
    return null; // Or render a fallback UI
  }
  
  return (
    <Box className="user-card">
      <UserAvatar/>
      <Box className="user-info">
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" color="textSecondary">{user.headline}</Typography>
      </Box>
    </Box>
  );
};

export default UserCard;

// const UserCard = ({ user }) => {
//   return (
//     <Box className="user-card">
//       <Avatar src={user.imgUrl} alt={user.name} className="user-avatar" />
//       <Box className="user-info">
//         <Typography variant="h6">{user.name}</Typography>
//         <Typography variant="body2" color="textSecondary">{user.headline}</Typography>
//       </Box>
//     </Box>
//   );
// };

// export default UserCard;