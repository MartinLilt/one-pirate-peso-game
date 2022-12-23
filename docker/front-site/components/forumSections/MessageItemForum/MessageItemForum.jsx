import s from "./MessageItemForum.module.scss";
import ReplyItemForum from "../ReplyItemForum/ReplyItemForum";
import User from "../../../assets/icon/user.png";
import OneMessageForum from "../OneMessageForum/OneMessageForum";
const uuid = require("uuid");

const MessageItemForum = ({ array }) => {
  const { topicTitle, topicText, topicAnswer, date, user, nameUser, lastDate } =
    array;
  return (
    <div className={s.forum__messageitem__all}>
      <OneMessageForum
        isAnswer={false}
        user={user}
        nameUser={nameUser}
        date={date}
        UserImage={User}
        topicText={topicText}
      />
      <ul className={s.forum__messageitem}>
        {topicAnswer.map((el) => (
          <li key={uuid.v4()} className={s.forum__messageitem_item}>
            <details className={s.forum__messageitem_details}>
              <summary className={s.forum__messageitem_summary}>
                <div className={s.forum__messageitem_lineanswer}>
                  <div className={s.forum__messageitem_lineanswer_first}></div>
                </div>
                <OneMessageForum
                  isAnswer={true}
                  user={el.user}
                  nameUser={el.nameUser}
                  date={el.date}
                  UserImage={User}
                  topicText={el.text}
                />
              </summary>
              <ReplyItemForum array={el.topicReply} />
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageItemForum;
