import s from "./ThemesForum.module.scss";
import baseTheme from "../base.json";
import ThreeDots from "../../shared/ThreeDots/ThreeDots";
const uuid = require("uuid");

const ThemesForum = () => {
  return (
    <div className={`layout default ${s.forum__themes}`}>
      <ul>
        {baseTheme.map((theme) => (
          <li key={uuid.v4()} className={s.forum__themes__item}>
            <div className={s.forum__themes__main}>
              <div className={s.forum__themes__line}></div>
              <h3 className={s.forum__themes__title}>{theme.title}</h3>
            </div>
            <ul>
              {theme.topicTheme.map((topic) => (
                <li key={uuid.v4()} className={s.forum__themes__item_subtitle}>
                  <div className={s.forum__themes__subtitle}>
                    <ThreeDots />
                    <button type="button" className={s.forum__themes__btn}>
                      {topic.subTitle}
                    </button>
                  </div>
                  <div className={s.forum__themes__update}>
                    <p className={s.forum__themes__update_text}>- Last Update: {topic.lastDate}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemesForum;
