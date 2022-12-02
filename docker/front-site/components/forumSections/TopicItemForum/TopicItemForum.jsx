import s from "./TopicItemForum.module.scss";
const uuid = require("uuid");

const TopicItemForum = ({ array }) => {
  console.log("array", array);
  return (
    <div className={s.forum__topic}>
      <ul>
        {array.map((el) => (
          <li className={s.forum__topic_item} key={uuid.v4()}>
            <p className={s.forum__topic_number}>{el.number}.&nbsp;</p>
            <p className={s.forum__topic_text}>-&nbsp;{el.topicTitle}..</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicItemForum;
