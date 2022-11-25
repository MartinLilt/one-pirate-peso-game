import s from "./ThreeDots.module.scss";

const ThreeDots = ({ ulClassName, liClassName }) => {
  return (
    <ul className={`${s.threedot} ${ulClassName}`}>
      <li className={`${s.threedot__dot} ${liClassName}`}></li>
      <li className={`${s.threedot__dot} ${liClassName}`}></li>
      <li className={`${s.threedot__dot} ${liClassName}`}></li>
    </ul>
  );
};

export default ThreeDots;
