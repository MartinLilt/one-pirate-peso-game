import { TfiMenu } from "react-icons/tfi";
import Image from "next/image";
import Logo from "../../../assets/icon/logo.svg";

import * as s from "./NavBar.module.scss";
import "../../../styles/globals.scss";

const NavBar = () => {
  return (
    <>
      <div className={`layout default ${s.nav_header}`}>
        <div className={s.nav_container}>
          <div>
            <Image src={Logo} alt="Logo" height={44} />
          </div>
          <TfiMenu size="25" />
        </div>
      </div>
    </>
  );
};

export default NavBar;

{
  /* <Link href="/">Back to the HomePage</Link>; */
}
