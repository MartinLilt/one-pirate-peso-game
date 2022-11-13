import * as s from "./footer.module.scss";
import Link from "next/link";
import "../../styles/globals.scss";

const Footer = () => {
  return (
    <footer className={s.background}>
      <div className="layout default">
        <div className={s.container}>
          <Link href="/">Back to the HomePage</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
