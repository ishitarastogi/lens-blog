import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import {
  generateChallenge,
  authenticate,
} from "../lib/apollo/auth/login";
import classes from "./Login.module.css";
import { setAuthenticationToken } from "../lib/apollo/auth/state";

 const Login = () => {
  const { data: accountData } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleLogin = async () => {
    const challenge = await generateChallenge(accountData?.address);
    if (!challenge) return;
    const signature = await signMessageAsync({
      message: challenge.data.challenge.text,
    });
    const accessTokens = await authenticate(accountData?.address, signature);
    await setAuthenticationToken({ token: accessTokens.data.authenticate });
    console.log(accessTokens.data.authenticate);
  };

  if (!accountData?.address) return null;
  return (
    <button className={classes.button}
      onClick={() => handleLogin()}
    >
      Login with Lens
    </button>
  );
};
export default Login;