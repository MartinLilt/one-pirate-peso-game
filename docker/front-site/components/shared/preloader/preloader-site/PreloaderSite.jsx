import * as s from "./PreloaderSite.module.scss";
import Image from "next/image";
import profilePic from "../../../../assets/img/home/desktop/preloader-site.png"

export const PreloaderSite = () => {
  return (
    <div className={s.preloader}>
      <Image src={profilePic} alt="One Peso Pirate" className={s.img} />
      <div className={s.loader}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
