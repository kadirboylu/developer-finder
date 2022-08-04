/*
  This component is designed for search results. Results are designed as cards and include profile picture, username and details button.
*/

import React from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import FakeSuspense from "../FakeSuspense/FakeSuspense";

// CSS
import "./Profiles.css";

const UserProfiles = ({ profiles, username }) => {
  const navigate = useNavigate();

  return (
    <div className="user-profiles">
      {/* If the search result matches any profile, the profiles are listed. If no match is found as a result of the search, "USER NOT FOUND" will be displayed on the screen. */}
      {profiles.length > 0 ? (
        profiles.map((profile) => {
          return (
            <div className="card-container" key={profile.id}>
              <div className="img-container">
                <img src={profile.avatar_url} alt={profile.login} />
              </div>
              <div className="info">
                {/* ---- USERNAME ---- */}
                <h3>{profile.login}</h3>
                {/* ---- CLICK TO SEE MORE DETAILS ABOUT PROFILE ---- */}
                <button
                  onClick={() => {
                    username = profile.url.replace(
                      "https://api.github.com/users/",
                      ""
                    );
                    navigate("/user", { state: { username: username } }); //Username data is transferred to "UserSection.jsx".
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="user-profiles">
          {/* This component is used to set the timeout. */}
          <FakeSuspense
            delay={2000}
            fallback={<h2>Searching...</h2>}
            children={<h2>USER NOT FOUND</h2>}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfiles;
