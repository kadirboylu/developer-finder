/*
  This component is designed for user details. 

  The component consists of user's,
  - Profile image
  - Name
  - Bio
  - Info section (Followers/Following, Github, Twitter, Location and Company infos)
  - Repositories
*/

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// React Icons
import {
  FaTwitter,
  FaBuilding,
  FaGithub,
  FaLocationArrow,
  FaLongArrowAltLeft,
} from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

// CSS
import "./userSection.css";

// COMPONENTS
import Repositories from "../RepositorySection/Repositories";

const UserSection = () => {
  const [user, setUser] = useState("");

  // Username data sent from "Profiles.jsx".
  const { state } = useLocation();
  const { username } = state;

  // Fetching user's data
  useEffect(() => {
    if (username === "") return;
    fetchUser(username);
  }, [username]);

  const fetchUser = async (user) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${user}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-wrapper">
      <div className="user">
        {/* ---- CLICK TO GO BACK ---- */}
        <div className="go-back">
          <a href="/">
            <FaLongArrowAltLeft />
          </a>
        </div>
        {/* ---- USER PHOTO ---- */}
        <div className="img-container">
          <img
            src={user.avatar_url}
            alt={user.name}
            style={{ maxWidth: "300px" }}
          />
        </div>
        {/* ---- NAME ---- */}
        <h1 className="username">{user.name}</h1>
        {/* ---- BIO ---- */}
        <p className="bio">{user.bio}</p>
        <div className="about">
          {/* ---- ICONS ---- */}
          <div className="icon-wrapper">
            <BsPeopleFill className="icon" />
            {user.company !== null && <FaBuilding className="icon" />}
            <FaGithub className="icon" />
            {user.twitter_username !== null && <FaTwitter className="icon" />}
            {user.location !== null && <FaLocationArrow className="icon" />}
          </div>
          {/* ---- INFO ---- */}
          <div className="text-wrapper">
            {/* ---- FOLLOWERS / FOLLOWING ---- */}
            <p>
              Followers: {user.followers} · Following: {user.following}
            </p>
            {/* ---- COMPANY ---- */}
            {user.company !== null && <p>{user.company} </p>}
            {/* ---- GITHUB ACCOUNT ---- */}
            <p>
              <a
                href={`https://github.com/${username}`}
                target={"_blank"}
                rel="noreferrer"
              >{`@${user.login}`}</a>
            </p>
            {/* ---- TWITTER ---- */}
            {user.twitter_username !== null && (
              <p>
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {`@${user.twitter_username}`}{" "}
                </a>
              </p>
            )}
            {/* ---- LOCATION ---- */}
            {user.location !== null && <p>{user.location} </p>}
          </div>
        </div>
        <div className="repos">
          <Repositories username={username} />
        </div>
      </div>
    </div>
  );
};

export default UserSection;
