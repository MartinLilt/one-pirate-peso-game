import { useMediaQuery } from "react-responsive";
import * as s from "./UpperHeader.module.scss";
import "../../../styles/globals.scss";
import Link from "next/link";
import LanguageSection from "../LanguageSection";

const UpperHeader = ({ active, setActive }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      <div className={s.background_color}>
        <div className="layout default">
          <div>
            {isMobile && (
              <div className={s.container}>
                <LanguageSection />
                <div>
                  <Link href="" className={s.title}>
                    Contact
                  </Link>
                </div>
              </div>
            )}
            {!isMobile && (
              <div className={s.container}>
                <div className={s.isTabletContainer}>
                  <LanguageSection />
                  <button
                    type="button"
                    onClick={() => setActive((prev) => !prev)}
                    className={s.title}
                  >
                    Privacy
                  </button>
                  <Link href="" className={s.title}>
                    Contact
                  </Link>
                </div>
                <div className={s.isTabletContainer}>
                  <Link href="" className={s.title}>
                    Donate to the project
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpperHeader;

{
  /* <Link href="/">Back to the HomePage</Link>; */
}
