import * as s from "./header.module.scss";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className={s.container}>
      <Link href="/">Back to the HomePage</Link>
    </header>
  );
};

export default Header;
