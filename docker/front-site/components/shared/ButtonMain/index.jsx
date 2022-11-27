import ThreeDots from "../ThreeDots/ThreeDots";
import s from "./ButtonMain.module.scss";

export default function ButtonMain({ text }) {
  return (
    <button className={s.button}>
      <div className={s.container}>
        <p className={s.text}>{text}</p>
        <ThreeDots ulClassName={s.ulThreeDots} liClassName={s.liThreeDots} />
      </div>
    </button>
  );
}
