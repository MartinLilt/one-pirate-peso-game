"use client";
import Header from "../components/header";
import Footer from "../components/footer";
import React, { useState } from "react";
import "../styles/globals.scss";
import Modal from "../components/shared/modal/Modal";
import AuthForm from "../components/homeSections/AuthForm/AuthForm";
import PrivPolLic from "../components/homeSections/PrivPolLic/PrivPolLic";

export default function RootLayout({ children }) {
  const [activeAuth, setActiveAuth] = useState(true);
  const [activePriv, setActivePriv] = useState(false);
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
        <Modal active={activeAuth} setActive={setActiveAuth}>
          {/* <Header /> */}
          <AuthForm active={activeAuth} setActive={setActiveAuth} />
        </Modal>
        <Modal active={activePriv} setActive={setActivePriv}>
          <Header />
          <PrivPolLic active={activePriv} setActive={setActivePriv} />
        </Modal>
      </body>
    </html>
  );
}
