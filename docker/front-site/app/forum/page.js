import React from "react";
import "../../styles/globals.scss";
import HeroForum from "../../components/forumSections/HeroForum/HeroForum.jsx";
import ThemesForum from "../../components/forumSections/ThemesForum/ThemesForum";

const Forum = () => {
  return <div>
   <HeroForum />
   <ThemesForum />
  </div>;
};

export default Forum;
