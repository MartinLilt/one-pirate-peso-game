import * as s from "./footer.module.scss";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className={s.container}>
      <Link href="/">Back to the HomePage</Link>
    </footer>
  );
};

export default Footer;
