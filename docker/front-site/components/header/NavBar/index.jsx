import { useMediaQuery } from "react-responsive";
import { TfiMenu } from "react-icons/tfi";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../assets/icon/logo.svg";
import ThreeDots from "../../shared/ThreeDots/ThreeDots";

import * as s from "./NavBar.module.scss";
import "../../../styles/globals.scss";
import ButtonMain from "../../shared/ButtonMain";
import NavSection from "./NavSection";

const NavBar = ({ setActive }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      <div className={`layout default ${s.nav_header}`}>
        <div className={s.nav_container}>
          <div className={s.image}>
            <Image src={Logo} alt="Logo" height={isMobile ? 44 : 68} />
          </div>
          {isMobile && <TfiMenu size="25" />}
          {isTablet && (
            <div className={s.flex_container}>
              <div className={s.flex_container_login}>
                <Link href="" className={s.link}>
                  <span className={s.text}>Log In</span>
                  <span>
                    <ThreeDots
                      ulClassName={s.ulThreeDots}
                      liClassName={s.liThreeDots}
                    />
                  </span>
                </Link>
              </div>
              <ButtonMain text="Menu" />
            </div>
          )}
          {isDesktopOrLaptop && (
            <>
              <NavSection />
              <div className={s.flex_container}>
                <div className={s.flex_container_login}>
                  <button
                    type="button"
                    onClick={() => setActive((prev) => !prev)}
                    className={s.link}
                  >
                    <span className={s.text}>Log In</span>
                    <span>
                      <ThreeDots
                        ulClassName={s.ulThreeDots}
                        liClassName={s.liThreeDots}
                      />
                    </span>
                  </button>
                </div>
                <ButtonMain text="Play Now" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
