import Link from "next/link";
import ThreeDots from "../../../shared/ThreeDots/ThreeDots";
import s from "./NavSection.module.scss";

export default function NavSection() {
  return (
    <ul className={s.list}>
      <li className={s.item}>
        <div className={s.container}>
          <Link href="" className={s.link}>
            <span className={s.text}>Home</span>
            <span>
              <ThreeDots
                ulClassName={s.ulThreeDots}
                liClassName={s.liThreeDots}
              />
            </span>
          </Link>
        </div>
      </li>
      <li className={s.item}>
        <div className={s.container}>
          <Link href="" className={s.link}>
            <span className={s.text}>Forum</span>
            <span>
              <ThreeDots
                ulClassName={s.ulThreeDots}
                liClassName={s.liThreeDots}
              />
            </span>
          </Link>
        </div>
      </li>
      <li className={s.item}>
        <div className={s.container}>
          <Link href="" className={s.link}>
            <span className={s.text}>New</span>
            <span>
              <ThreeDots
                ulClassName={s.ulThreeDots}
                liClassName={s.liThreeDots}
              />
            </span>
          </Link>
        </div>
      </li>
      <li className={s.item}>
        <div className={s.container}>
          <Link href="" className={s.link}>
            <span className={s.text}>Wiki</span>
            <span>
              <ThreeDots
                ulClassName={s.ulThreeDots}
                liClassName={s.liThreeDots}
              />
            </span>
          </Link>
        </div>
      </li>
      <li className={s.item}>
        <div className={s.container}>
          <Link href="" className={s.link}>
            <span className={s.text}>About</span>
            <span>
              <ThreeDots
                ulClassName={s.ulThreeDots}
                liClassName={s.liThreeDots}
              />
            </span>
          </Link>
        </div>
      </li>
    </ul>
  );
}
