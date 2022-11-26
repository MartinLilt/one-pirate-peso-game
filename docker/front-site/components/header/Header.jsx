"use client";
import UpperHeader from "./UpperHeader";
import NavBar from "./NavBar";
import * as s from "./header.module.scss";
import Link from "next/link";
import "../../styles/globals.scss";

const Header = () => {
  return (
    <header>
      <UpperHeader />
      <NavBar />
    </header>
  );
};

export default Header;
