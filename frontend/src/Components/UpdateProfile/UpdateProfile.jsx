import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProfile.css";
import { loadUser, updateProfile } from "../../Actions/User";
import { useSnackbar } from "notistack";
import Loader from "../Loader/Loader";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch({ type: "clearErrors" });
    }

    if (updateError) {
      enqueueSnackbar(updateError, { variant: "error" });
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, enqueueSnackbar, updateError, message]);

  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="updateProfileInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
