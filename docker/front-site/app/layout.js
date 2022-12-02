"use client";
import Header from "../components/header";
import Footer from "../components/footer";
import React, { Suspense, useState } from "react";
import "../styles/globals.scss";
import Modal from "../components/shared/modal/Modal";
import SignUpForm from "../components/homeSections/SignUpForm/SignUpForm";
import PrivPolLic from "../components/homeSections/PrivPolLic/PrivPolLic";
import LogInForm from "../components/homeSections/LogInForm/LogInForm";
import Loading from "./loading";

export default function RootLayout({ children }) {
  const [activeSignUp, setActiveSignUp] = useState(false);
  const [activeLogIn, setActiveLogIn] = useState(false);
  const [activePriv, setActivePriv] = useState(false);
  const [license, setLicense] = useState(false);

  const activeModal = activeSignUp || activeLogIn || activePriv;
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
        <Header setActivePriv={setActivePriv} setActiveLogIn={setActiveLogIn} />

        <Suspense fallback={<Loading />}>
          <div></div>
          <main> {children} </main>
        </Suspense>

        <Footer setActivePriv={setActivePriv} setLicense={setLicense} />
        <Modal active={activeModal}>
          <Header
            setActivePriv={setActivePriv}
            setActiveLogIn={setActiveLogIn}
          />
          {activeSignUp && (
            <SignUpForm active={activeSignUp} setActive={setActiveSignUp} />
          )}
          {activeLogIn && (
            <LogInForm active={activeLogIn} setActive={setActiveLogIn} />
          )}
          {activePriv && (
            <PrivPolLic
              active={activePriv}
              setActive={setActivePriv}
              license={license}
              setLicense={setLicense}
            />
          )}
        </Modal>
      </body>
    </html>
  );
}
