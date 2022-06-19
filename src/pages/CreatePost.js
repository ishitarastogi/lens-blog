import React from 'react'
import CreatePosts from '../components/post/CreatePosts'
import { GET_PROFILES } from "../api/profile/get-profiles";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { Redirect } from "react-router-dom";
function CreatePost() {
   const { data: accountData } = useAccount();
   const { data: profileData } = useQuery(GET_PROFILES, {
     variables: {
       request: { ownedBy: [accountData?.address] },
     },
   });

   // console.log("profileData", profileData);

   if (!profileData) return null;
   const currentUser = profileData.profiles.items[0];

     if (!currentUser)
       return <div>{<Redirect to="createProfile/" />}</div>;
  return (
    <div>
      <CreatePosts currentUser={currentUser} />
    </div>
  );
}

export default CreatePost