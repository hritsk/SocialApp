import React, { useEffect, useState } from 'react';
import "./Register.css";
import { Avatar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../../Actions/User';
import { useSnackbar } from 'notistack';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch  = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <div className='register'>
      <form className='registerForm' onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>
        <Avatar src={avatar} alt='User' sx={{ height: "10vmax", width: "10vmax" }} />
        <input type='file' accept='image/*' onChange={handleImageChange} />
        <input
          type='text'
          value={name}
          placeholder='Name'
          className='registerInputs'
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className='registerInputs'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className='registerInputs'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to='/'><Typography>Already Signed Up? Login Now</Typography></Link>
        <Button disabled={loading} type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default Register;
