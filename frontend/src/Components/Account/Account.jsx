import React, { useEffect, useState } from "react";
import "./Account.css";
// ✅ Replace useAlert with useSnackbar
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import User from "../User/User";

const Account = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // ✅ notistack hook
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { error: likeError, message, loading: deleteLoading } = useSelector((state) => state.like);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const safePosts = Array.isArray(posts) ? posts : [];

  const logoutHandler = () => {
    dispatch(logoutUser());
    enqueueSnackbar("Logged out Successfully", { variant: "success" }); // ✅ replaced alert
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" }); // ✅ replaced alert
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      enqueueSnackbar(likeError, { variant: "error" }); // ✅ replaced alert
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" }); // ✅ replaced alert
      dispatch({ type: "clearMessage" });
    }
  }, [error, likeError, message, dispatch, enqueueSnackbar]);

  if (loading || userLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Typography variant="h5">User data could not be loaded.</Typography>;
  }

  return (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          safePosts.map((post) => (
            <Post
              key={post?._id}
              postId={post?._id}
              caption={post?.caption || ""}
              postImage={post?.image?.url || "default-image-url.jpg"}
              likes={post?.likes || []}
              comments={post?.comments || []}
              ownerImage={post?.owner?.avatar?.url || "default-avatar-url.jpg"}
              ownerName={post?.owner?.name || "Unknown"}
              ownerId={post?.owner?._id || ""}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">No Posts To Show</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user?.avatar?.url || "default-avatar-url.jpg"}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user?.name || "Guest User"}</Typography>
        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user?.followers?.length || 0}</Typography>
        </div>
        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user?.following?.length || 0}</Typography>
        </div>
        <div>
          <button>
            <Typography style={{ margin: "2vmax" }}>Posts</Typography>
          </button>
          <Typography>{user?.posts?.length || 0}</Typography>
        </div>
        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
          disabled={deleteLoading}
        >
          Delete My Profile
        </Button>

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user?.followers?.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower?._id}
                  userId={follower?._id}
                  name={follower?.name || "Unknown"}
                  avatar={follower?.avatar?.url || "default-avatar-url.jpg"}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4" style={{ margin: "2vmax" }}>
              Following
            </Typography>
            {user?.following?.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow?._id}
                  userId={follow?._id}
                  name={follow?.name || "Unknown"}
                  avatar={follow?.avatar?.url || "default-avatar-url.jpg"}
                />
              ))
            ) : (
              <Typography>You're not following anyone</Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
