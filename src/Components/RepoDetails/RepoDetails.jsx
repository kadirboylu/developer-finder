/*
  This component is designed to detail repositories.
*/

import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

// ICONS
import { FaGithub } from "react-icons/fa";

// CSS
import "./repodetails.css";

const RepoDetails = ({ username, repo }) => {
  const [lang, setLang] = useState({});

  // Copy to clipboard
  const [copy, setCopy] = useState("");
  let isCopied = repo.id === copy ? true : false;
  // ----

  // Format date
  const date = repo.created_at.replace("T", "-").replace("Z", "").split("-");

  const day = date[2];
  const month = date[1];
  const year = date[0];
  const time = date[3];
  // ----

  // ---- Fetching languages ----
  useEffect(() => {
    if (repo.id === "") return;

    const fetchLang = async (repo) => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${repo.name}/languages`
        );
        setLang(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLang(repo);
  }, [repo, username]);
  // ----

  return (
    <div className="details-wrapper">
      <ul>
        {/* ---- Created At ---- */}
        <li className="created-time">
          <h3>Created at </h3>
          <p>
            {day}/{month}/{year} {time}
          </p>
        </li>
        {/* ---- Clone Project ---- */}
        <li className="clone-project">
          <h3>Clone Project</h3>
          <code>
            <div className="clone">git clone {repo.clone_url}</div>
            <div>
              <CopyToClipboard text={`git clone ${repo.clone_url}`}>
                <button
                  style={{ backgroundColor: isCopied && "green" }}
                  onClick={() => setCopy(repo.id)}
                >
                  {isCopied ? "Copied" : "Copy"}
                </button>
              </CopyToClipboard>
            </div>
          </code>
        </li>
        {/* ---- Github Link ---- */}
        <li className="github-link">
          <h3>
            <FaGithub /> Github
          </h3>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            /{repo.name}
          </a>
        </li>
        {/* ---- LANGUAGES ---- */}
        <li className="languages">
          {Object.values(lang).length > 0 && <h3>Languages</h3>}
          {Object.keys(lang).map((key, index) => {
            return (
              <p key={index}>
                • <span>{key}: </span>
                {(
                  (lang[key] * 100) /
                  Object.values(lang).reduce((acc, val) => (acc += val))
                ).toFixed(1)}
                %
              </p>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default RepoDetails;
