import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import Header from "../../Components/HeaderSection/Header";
import Profiles from "../../Components/Profiles/Profiles";

const Home = () => {
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [username, setUsername] = useState("");

  // ---- Fetching Profiles ----
  useEffect(() => {
    if (search === "") return;
    fetchProfiles(search);
  }, [search]);

  const fetchProfiles = async (query) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}+in:user`
      );
      setProfiles([...response.data.items]);
    } catch (error) {
      console.error(error);
    }
  };
  // ----

  return (
    <div>
      <Header setSearch={setSearch} />
      {search !== "" && (
        <Profiles
          profiles={profiles}
          username={username}
          setUsername={setUsername}
        />
      )}
    </div>
  );
};

export default Home;
