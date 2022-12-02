import { useMediaQuery } from "react-responsive";
import * as s from "./PreloaderGame.module.scss";
import Image from "next/image";
import imgDesktop from "../../../../assets/img/home/desktop/preloader-site.png";
import imgMobile from "../../../../assets/img/home/modile/preloader-site.png";
import ButtonMain from "../../ButtonMain";

export const PreloaderGame = () => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={s.preloader}>
      <div className={s.container}>
        {(isMobile || isTablet) && (
          <Image src={imgMobile} alt="One Peso Pirate" className={s.img} />
        )}
        {isDesktop && (
          <Image src={imgDesktop} alt="One Peso Pirate" className={s.img} />
          
        )}
        {(isMobile || isTablet) && (
          <h2 className={s.preloader_title}>
            Your device is not suitable to run the game..
          </h2>
        )}
        <p className={s.preloader_text}>
          The name peso was given to the 8-real silver coin introduced in 1497,
          minted at 83⁄8 pesos to a Castilian mark. It was minted in large
          quantities after the discovery of silver in Mexico.
        </p>
        {(isMobile || isTablet) && <ButtonMain text="Contact Us" width="202px"/>}
      </div>
    </div>
  );
};
