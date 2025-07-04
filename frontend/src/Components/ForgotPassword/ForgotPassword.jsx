import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// ✅ Replace react-alert with notistack
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // ✅ Use Snackbar
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" }); // ✅ Show error
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" }); // ✅ Show success
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch, enqueueSnackbar]);

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
