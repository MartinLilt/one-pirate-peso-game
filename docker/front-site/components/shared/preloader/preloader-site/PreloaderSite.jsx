import { useMediaQuery } from "react-responsive";
import * as s from "./PreloaderSite.module.scss";
import Image from "next/image";
import imgDesktop from "../../../../assets/img/home/desktop/preloader-site.png";
import imgMobile from "../../../../assets/img/home/modile/preloader-site.png";

export const PreloaderSite = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={s.preloader}>
      {isMobile && (
        <Image src={imgMobile} alt="One Peso Pirate" className={s.img} />
      )}
      {(isTablet || isDesktopOrLaptop) && (
        <Image src={imgDesktop} alt="One Peso Pirate" className={s.img} />
      )}
      <div className={s.loader}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
