"use client";
import UpperHeader from "./UpperHeader";
import NavBar from "./NavBar";
import "../../styles/globals.scss";

const Header = ({ setActivePriv, setActiveLogIn }) => {
  return (
    <header>
      <UpperHeader setActive={setActivePriv} />
      <NavBar setActive={setActiveLogIn} />
    </header>
  );
};

export default Header;
