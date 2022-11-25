"use client";
import Header from "../components/header";
import Footer from "../components/footer";
import React, { useState } from "react";
import "../styles/globals.scss";
import Modal from "../components/shared/modal/Modal";
import SignUpForm from "../components/homeSections/SignUpForm/SignUpForm";
import PrivPolLic from "../components/homeSections/PrivPolLic/PrivPolLic";
import LogInForm from "../components/homeSections/LogInForm/LogInForm";

export default function RootLayout({ children }) {
  const [activeSignUp, setActiveSignUp] = useState(false);
  const [activeLogIn, setActiveLogIn] = useState(false);
  const [activePriv, setActivePriv] = useState(true);
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Marcellus+SC&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Header />
        <div></div>
        <main>{children}</main>
        <Footer />
        <Modal active={activeSignUp} setActive={setActiveSignUp}>
          <Header />
          <SignUpForm active={activeSignUp} setActive={setActiveSignUp} />
        </Modal>
        <Modal active={activeLogIn} setActive={setActiveLogIn}>
          <Header />
          <LogInForm active={activeLogIn} setActive={setActiveLogIn} />
        </Modal>
        <Modal active={activePriv} setActive={setActivePriv}>
          <Header />
          <PrivPolLic active={activePriv} setActive={setActivePriv} />
        </Modal>
      </body>
    </html>
  );
}
