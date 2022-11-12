import React from "react";
import "../styles/globals.scss";
import Head from "next/head";

import { HomeHeroContent } from "../components/homeSections/hero/Hero";
import { HomeWikiContent } from "../components/homeSections/wiki/Wiki";
import { HomeNewContent } from "../components/homeSections/new/New";
import { HomeFormContent } from "../components/homeSections/form/Form";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="I hope this tutorial is helpful for you"
        />
      </Head>
      {/* Hero section below this */}
      <section className="layout">
        <HomeHeroContent />
      </section>
      {/* Wiki-preview section below this */}
      <section className="layout">
        <HomeWikiContent />
      </section>
      {/* New-preview section below this */}
      <section className="layout">
        <HomeNewContent />
      </section>
      {/* FeedBack-from section below this */}
      <section className="layout">
        <HomeFormContent />
      </section>
    </>
  );
};

export default Home;
