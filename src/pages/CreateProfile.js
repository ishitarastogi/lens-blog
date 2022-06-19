import React from 'react'
import CreateProfiles from '../components/profile/CreateProfiles'
import {GET_PROFILES} from "../api/profile/get-profiles"
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

function CreateProfile() {
         const { data: accountData } = useAccount();
         const { data: profileData } = useQuery(GET_PROFILES, {
           variables: {
             request: { ownedBy: [accountData?.address] },
           },
         });
           if (!profileData) return null;

           const currentUser = profileData.profiles.items[0];
  return (
    <div>
      <CreateProfiles currentUser={currentUser} />
    </div>
  );
}

export default CreateProfile