import { useMediaQuery } from "react-responsive";
import { TfiMenu } from "react-icons/tfi";
import Image from "next/image";
import Logo from "../../../assets/icon/logo.svg";
import ThreeDots from "../../shared/ThreeDots/ThreeDots";

import * as s from "./NavBar.module.scss";
import "../../../styles/globals.scss";

const NavBar = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      <div className={`layout default ${s.nav_header}`}>
        <div className={s.nav_container}>
          <div>
            <Image src={Logo} alt="Logo" height={isMobile ? 44 : 68} />
          </div>
          {isMobile && <TfiMenu size="25" />}
          {isTablet && (
            <div className={s.flex_container}>
              <div className={s.flex_container_login}>
                <p className={s.text}>Log In</p>
                <ThreeDots
                  ulClassName={s.ulThreeDots}
                  liClassName={s.liThreeDots}
                />
              </div>
              <button>Кнопка</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;

{
  /* <Link href="/">Back to the HomePage</Link>; */
}
