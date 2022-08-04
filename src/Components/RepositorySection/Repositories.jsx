/*
  This component is designed to list the user's repositories.
*/

import React, { useState, useEffect } from "react";
import axios from "axios";

// Icons
import { GoRepoForked } from "react-icons/go";

// CSS
import "./repositories.css";

//Components
import RepoDetails from "../RepoDetails/RepoDetails";

const Repositories = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [showMore, setShowMore] = useState("");

  // --- Fetching Repos ----
  useEffect(() => {
    if (username === "") return;

    const fetchRepos = async (user) => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${user}/repos`
        );
        setRepos([...response.data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRepos(username);
  }, [username]);
  // ----

  return (
    <div className="repos-wrapper">
      <div className="repos-header">
        <h2>REPOSITORIES</h2>
      </div>
      <div className="repositories">
        {repos.map((repo) => {
          return (
            <div className="repository-wrapper" key={repo.id}>
              <div className="repository">
                {/* --- INFO SECTION --- */}
                <div className="repo-info">
                  {/* --- REPO NAME --- */}
                  <h2 className="repo-name">
                    {repo.fork && <GoRepoForked />}
                    {repo.name}
                  </h2>
                  {/* --- REPO DESCRIPTION --- */}
                  <p className="repo-description">
                    <span>Description:</span>{" "}
                    {repo.description === null ? "-" : repo.description}
                  </p>
                </div>
                {/* --- DETAILS BUTTON --- */}
                <div className="repo-btn">
                  <button
                    onClick={() =>
                      showMore === repo.id
                        ? setShowMore("")
                        : setShowMore(repo.id)
                    }
                  >
                    {showMore === repo.id ? "▲" : "▼"}
                  </button>
                </div>
              </div>
              {/* --- DETAILS SECTION --- */}
              <div className="repo-details">
                {showMore === repo.id && (
                  <RepoDetails username={username} repo={repo} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Repositories;
