"use client";
import s from "./HeroForum.module.scss";
import Image from "next/image";
import Logo from "../../../assets/icon/logo.svg";

const HeroForum = () => {
  return (
    <div className={s.forum__hero}>
      <div className={`default layout ${s.forum__hero__container}`}>
        <div className={s.forum__hero__image}>
          <Image className={s.forum__hero__svg} src={Logo} alt="Logo" />
        </div>
        <h2 className={s.forum__hero__title}>Game forum</h2>
      </div>
    </div>
  );
};

export default HeroForum;
