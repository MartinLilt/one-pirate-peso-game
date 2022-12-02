// "use client";
import s from "./ThemesForum.module.scss";
import baseTheme from "../base.json";
import ThreeDots from "../../shared/ThreeDots/ThreeDots";
import TopicItemForum from "../TopicItemForum/TopicItemForum";
const uuid = require("uuid");

const ThemesForum = () => {
  const count = (array) => {
    let messages = 0;

    for (let i = 0; i < array.length; i = i + 1) {
      if (!!array[i].topicAnswer.length) {
        messages = messages + array[i].topicAnswer.length;
        for (let k = 0; k < array[i].topicAnswer.length; k = k + 1) {
          if (!!array[i].topicAnswer[k].topicReply.length) {
            messages = messages + array[i].topicAnswer[k].topicReply.length;
          }
        }
      }
    }
    return messages;
  };

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
                  <details className={s.forum__themes__item_details}>                    
                    <summary>                      
                      <div className={s.forum__themes__subtitle}>
                        <ThreeDots />
                        <div  className={s.forum__themes__btn}>
                          <p className={s.forum__themes__btn_text}>
                            {topic.subTitle}
                          </p>
                          <div className={s.forum__themes__update}>
                            <div className={s.forum__themes_desk}>
                              <p className={s.forum__themes__update_text}>
                                - Discussions: {topic.topicDiscussions.length}
                                &nbsp;
                              </p>
                              <p className={s.forum__themes__update_text}>
                                - Messages: &nbsp;
                                {count(topic.topicDiscussions)}
                                &nbsp;
                              </p>
                            </div>
                            <p className={s.forum__themes__update_text}>
                              - Last Update: {topic.lastDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </summary>
                    <TopicItemForum array={topic.topicDiscussions} />
                  </details>
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
