import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {CREATE_PROFILE} from "../../api/profile/create-profile"
import  './Profile.css';
function CreateProfiles({currentUser}) {
    const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
    const [handle, setHandle] = useState("");

  const [createProfile, { data, loading, error }] = useMutation(
    CREATE_PROFILE,
    {
      onCompleted: () => {
        setSubmitError("");
        setSubmitSuccess(
          "Profile Created, it may take a few minutes to be visible.  Please refresh the page in a few minutes."
        );
      },
      onError: (error) => {
        console.log("create profile error", error);
        setSubmitError(error.message);
      },
    }
  );

 

  if (loading)
    return (
      <div >
        <div >Submitting...</div>
      </div>
    );
  if (error)
    return (
        <div>
          Submission error! {error.message}
        </div>
    );

  const handleCreateProfile = async () => {
    setSubmitError("");
    await createProfile({
      variables: {
        request: {
          handle: handle, 
        },
      },
    });
  };
        
  if (submitSuccess)
    return (
      
        <div >
          {submitSuccess}
        </div>
    
    );

  return (
    <div>
      <div class="bold-line"></div>
      <div class="container">
        <div class="window">
          <div class="overlay"></div>
          <div class="content">
            <div class="welcome">Hello There!</div>
            <div class="subtitle">
              Welcome to Mind Tales!!!
            </div>
            <form onSubmit={handleCreateProfile}>
              <div class="input-fields">
                <input
                  id="handle"
                  type="text"
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="Username"
                  class="input-line full-width"
                ></input>
              </div>
              <div>
                <button class="ghost-round full-width">Create Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {submitError && (
        <div>{submitError}</div>
      )}
    </div>
  );
};
export default CreateProfiles;