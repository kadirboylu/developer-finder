/*
  This component is designed for the header section of the page.

  The component consists of:
  - h1 tag for page name
  - text box for search bar
  - button to search profiles
*/

import React, { useState } from "react";

// ICONS
import { FaGithub } from "react-icons/fa";

// CSS
import "./header.css";

const Header = ({ setSearch }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    const searchedUser = e.target.value;

    setText(searchedUser);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(text);
  };

  return (
    <div className="header">
      {/* ---- PAGE NAME ----  */}
      <h1>
        <FaGithub /> Developer Finder
      </h1>
      {/* ---- SEARCH FORM ----  */}
      <form onSubmit={onSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="Search users"
          value={text}
          onChange={handleChange}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Header;
