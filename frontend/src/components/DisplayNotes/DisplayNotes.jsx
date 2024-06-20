import { useState, useEffect } from "react";
import { styles } from "./DisplayNotes.module.css";

export const DisplayNotes = () => {
  const [recentGratitudes, setRecentGratitudes] = useState([]);

  //OLD API FOR WEEK 7 LINKED TO TECHNIGO
  // const thoughtsAPI = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  //NEW API I CREATED IN WEEK 14 WITH MONGO
  const thoughtsAPI =
    "https://project-happy-thoughts-api-n0pa.onrender.com/thoughts";

  //new API for gratitude database created June 2024
  const GratitudeAPI =
    //---Initial useEffect hook to run on first mount
    useEffect(() => {
      fetchGratitudes();
    }, []);

  //----------- function to -------------//
  const fetchGratitudes = () => {
    fetch(thoughtsAPI)
      .then((response) => response.json())
      .then((data) => {
        setRecentGratitudes(data);
      })
      .catch((error) => {
        console.error("Failed to fetch info", error);
      });

    console.log(recentGratitudes);
  };

  return (
    <div>
      <p>recent posts</p>
      <ul className={gratitudeContainer}>
        {recentGratitudes.map((recentGratitude) => (
          <li className={styles.gratitudeBox} key={recentGratitude._id}>
            {recentGratitude.message}
            <div>
              <p>
                {/* <UpdateHearts
                  heartID={recentThought._id}
                  heartCount={recentThought.hearts}
                />
                <TimeandDate time={recentThought.createdAt} /> */}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
