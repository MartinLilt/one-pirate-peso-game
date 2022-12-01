"use client";
import UpperHeader from "./UpperHeader";
import NavBar from "./NavBar";
import "../../styles/globals.scss";
import s from "./header.module.scss";

const Header = ({ setActivePriv, setActiveLogIn }) => {
  return (
    <header className={s.header}>
      <UpperHeader setActive={setActivePriv} />
      <NavBar setActive={setActiveLogIn} />
    </header>
  );
};

export default Header;
