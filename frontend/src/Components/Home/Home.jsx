import React, { useEffect } from 'react';
import "./Home.css";
import User from '../User/User';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingPosts, getAllUsers } from '../../Actions/User';
import Loader from "../Loader/Loader";
import { Typography } from '@mui/material';
// ✅ Replace react-alert with notistack
import { useSnackbar } from 'notistack';

const Home = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // ✅ Use Snackbar

  const { loading, posts, error } = useSelector((state) => state.postOfFollowing);
  const { users, loading: usersLoading } = useSelector((state) => state.allUsers);
  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      enqueueSnackbar(likeError, { variant: "error" });
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch({ type: "clearMessage" });
    }
  }, [error, likeError, message, enqueueSnackbar, dispatch]);

  return loading || usersLoading ? (
    <Loader />
  ) : (
    <div className='home'>
      <div className='homeleft'>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post 
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant='h6'>No Posts Yet</Typography>
        )}
      </div>
      <div className='homeright'>
        {users && users.length > 0 ? (
          users.map((user) => (
            <User 
              key={user._id}
              userId={user._id} 
              name={user.name} 
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No users yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
