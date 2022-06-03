import "./App.css";
import React, { useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createProfile } from "./api/profile/create-profile";
const handle = "ishitaaaa";

function App() {
  const onCreateProfile = async (e) => {
    e.preventDefault();
    console.log("onCreateProfile");
    try {
      const res = await createProfile(
        "0x0Db723d5863A9B33AD83aA349B27F8136b6d5360",
        handle
      );
      console.log(res);
    } catch (err) {
      console.error(err?.message);
    }
  };

  return (
    <div className="App">
      <ConnectButton />
      <button onClick={onCreateProfile}>createProfile</button>
    </div>
  );
}

export default App;
