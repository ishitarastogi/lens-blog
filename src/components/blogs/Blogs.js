import React from 'react'
import { useQuery } from "@apollo/client";
import {EXPLORE_PUBLICATIONS} from "../../api/explore-publications"
import Card from '../ui/Card';
import { Redirect } from "react-router-dom";
import classes from "./Blog.module.css"
import moment from 'moment';
import { useHistory } from 'react-router';
function Blogs() {
const history = useHistory();

      const { data, loading, error } = useQuery(EXPLORE_PUBLICATIONS, {
        variables: {
          request: {
            sortCriteria: "LATEST",
            limit: 20,
          },
        },
      });

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error!</div>;
      console.log(data);
  return (
    <div>
      <h1>Welcome to Mind Tales</h1>
      <div className={classes.container}>
        {data.explorePublications.items.map((data, index) => (
          <Card>
            <div key={index} className={classes.main}>
              <div className={classes.header}>
                <img
                  onClick={() =>
                    history.push(`/profile/${data.profile.handle}`)
                  }
                  width="80px"
                  height="80px"
                  src={data.profile?.picture?.original?.url}
                ></img>
                <div>
                  <p>@{data.profile?.handle}</p>

                  <p>{data.metadata?.content}</p>
                </div>
              </div>

              <div>
                <h2>{data.profile?.name}</h2>
                <p className={classes.createdAt}>
                  {moment(data.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Blogs