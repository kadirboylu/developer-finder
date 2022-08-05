import React, { useState, useEffect } from "react";
import axios from "axios";

// CSS
import "./language.css";

const Languages = ({ username }) => {
  const [repos, setRepos] = useState([]);

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

  // The languages ​​used in the repositories will be counted.
  const obj = repos.reduce((obj, repo) => {
    if (repo.language !== null) {
      obj.hasOwnProperty(repo.language)
        ? (obj[repo.language] += 1)
        : (obj[repo.language] = 1);
    }
    return obj;
  }, {});

  // Size of total code
  const totalCode = repos.reduce((acc, repo) => {
    acc += repo.size;
    return acc;
  }, 0);

  return (
    <div className="languages-wrapper">
      <h2>Most Used Languages</h2>
      {Object.keys(obj).map((key) => {
        return (
          <div className="languages" key={key}>
            {/* LANGUAGE */}
            <div className="language">
              <h3>{key}</h3>
            </div>
            {/* LANGUAGE USAGE */}
            <div className="bar">
              <div
                className="progress"
                style={{
                  width: `${((obj[key] * 100) / repos.length).toFixed(1)}%`,
                }}
              >
                <p>{((obj[key] * 100) / repos.length).toFixed(1)} %</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="repo-infos">
        {/* PUBLIC REPOS */}
        <div className="public-repos">
          <h3>
            Public Repos: <span>{repos.length}</span>
          </h3>
        </div>
        {/* Size of codes */}
        <div className="size">
          <h3>
            Size: <span>{(totalCode / 1024).toFixed(2)} MB Code</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Languages;
