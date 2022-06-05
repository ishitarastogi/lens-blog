import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { generateChallenge, authenticate } from "../../../src/lib/apollo/auth/login";
import { setAuthenticationToken } from "../../../src/lib/apollo/auth/state";

export  const LensLogin = () => {
  const { data: accountData } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleLogin = async () => {
    const challenge = await generateChallenge(accountData?.address);
    if (!challenge) return;
    const signature = await signMessageAsync({
      message: challenge.data.challenge.text,
    });
    const accessTokens = await authenticate(
      accountData?.address ,
      signature 
    );
    await setAuthenticationToken({ token: accessTokens.data.authenticate });
    console.log(accessTokens.data.authenticate )
  };

  if (!accountData?.address) return null;
  return (
    <button  onClick={() => handleLogin()}>
      Login with Lens
    </button>
  );
};
