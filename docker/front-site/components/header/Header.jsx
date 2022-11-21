"use client";
import * as s from "./header.module.scss";
import Link from "next/link";
import "../../styles/globals.scss";
import Modal from "../shared/modal/Modal";
import { useState } from "react";
import AuthForm from "../homeSections/AuthForm/AuthForm";

const Header = () => {
  return (
    <header>
      <div className="layout default">
        <div className={s.header}>
          <Link href="/">Back to the HomePage</Link>
        </div>
      </div>
    
    </header>
  );
};

export default Header;
