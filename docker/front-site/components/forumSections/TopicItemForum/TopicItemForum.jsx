import MessageItemForum from "../MessageItemForum/MessageItemForum";
import s from "./TopicItemForum.module.scss";
const uuid = require("uuid");

const TopicItemForum = ({ array }) => {
  return (
    <div className={s.forum__topic}>
      <ul>
        {array.map((el) => (
          <li className={s.forum__topic_item} key={uuid.v4()}>
            <details className={s.forum__topic_details}>
              <summary className={s.forum__topic_summary}>
                <p className={s.forum__topic_number}>{el.number}.&nbsp;</p>
                <p className={s.forum__topic_text}>-&nbsp;{el.topicTitle}..</p>
              </summary>
              <MessageItemForum array={el.topicAnswer} />
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicItemForum;
