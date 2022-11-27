import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/icon/logo.svg";
import * as s from "./footer.module.scss";
import "../../styles/globals.scss";

const Footer = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <footer className={s.background}>
      <div className="layout default">
        <div className={s.container}>
          <div>
            <Image
              src={Logo}
              alt="Logo"
              height={
                (isMobile && 70) ||
                (isTablet && 78) ||
                (isDesktopOrLaptop && 106)
              }
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
