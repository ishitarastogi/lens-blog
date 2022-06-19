import React from 'react'
import {useParams} from "react-router-dom"
import {useQuery} from "@apollo/client"
import {GET_PROFILES} from "../api/profile/get-profiles"
import Card from '../components/ui/Card'
import classes from '../components/blogs/Blog.module.css'
function ShowProfiles() {
      let { handle } = useParams();
  const {
    data: profileData,
    loading,
    error,
  } = useQuery(GET_PROFILES, {
    variables: {
      request: { handles: [handle] },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const profile = profileData.profiles.items[0];
  return (
    <div className={classes.container}>
      {" "}
      <Card>
        <div className={classes.main}>
          <div className={classes.header}>
            <img
              width="80px"
              height="80px"
              src={profile?.picture?.original?.url}
            ></img>{" "}
          </div>

          <div>
            <h3>{profile.name}</h3>
            <h2><u>Handle:</u> {profile.handle}</h2>
            <p><u>Bio:</u> {profile.bio}</p>
            <div>
              <span>
                <span>followers :</span>
                <span>{profile.stats.totalFollowers}</span>
              </span>
              <span>
                <span>following :</span>
                <span>{profile.stats.totalFollowing}</span>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ShowProfiles