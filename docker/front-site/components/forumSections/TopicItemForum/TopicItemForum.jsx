import MessageItemForum from "../MessageItemForum/MessageItemForum";
import s from "./TopicItemForum.module.scss";
const uuid = require("uuid");

const TopicItemForum = ({ array }) => {
  const isOpen = false;

  return (
    <div className={s.forum__topic}>
      <p className={s.forum__topic_text_fordics}>- Topics for Discussion:</p>
      <ul>
        {array.map((el) => (
          <li
            id={el._id}
            className={
              isOpen ? `${s.forum__topic_item_open}` : `${s.forum__topic__item}`
            }
            key={uuid.v4()}
            onClick={(e) => console.log("e.target :>> ", e.currentTarget.id)}
          >
            <details className={s.forum__topic_details}>
              <summary className={s.forum__topic_summary}>
                <p className={s.forum__topic_number}>{el.number}.&nbsp;</p>
                <p className={s.forum__topic_text}>-&nbsp;{el.topicTitle}..</p>
              </summary>
              <MessageItemForum
                array={el}
                // topicText={el.topicText}
              />
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicItemForum;
