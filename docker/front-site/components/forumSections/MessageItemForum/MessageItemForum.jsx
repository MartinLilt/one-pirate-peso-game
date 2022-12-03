import s from "./MessageItemForum.module.scss";
import Image from "next/image";
import ReplyItemForum from "../ReplyItemForum/ReplyItemForum";
import User from "../../../assets/icon/user.png";
const uuid = require("uuid");

const MessageItemForum = ({ array }) => {
  return (
    <ul className={s.forum__messageitem}>
      {array.map((el) => (
        <li key={uuid.v4()} className={s.forum__messageitem_item}>
          <details className={s.forum__messageitem_details}>
            <summary className={s.forum__messageitem_summary}>
              <div className={s.forum__messageitem_avatar}>
                <Image
                  src={User}
                  width={37.5}
                  height={37.5}
                  alt="user"
                  className={s.forum__messageitem_svg}
                />
              <div className={s.forum__messageitem__line_answer_vert}></div>
              </div>
              <div className={s.forum__messageitem_message}>
                <div className={s.forum__messageitem_info}>
                  <p className={s.forum__messageitem__text}>{el.user}</p>
                  <div className={s.forum__messageitem_line}></div>
                  <p className={s.forum__messageitem__text}>{el.nameUser}</p>
                  <div className={s.forum__messageitem_line}></div>
                  <p className={s.forum__messageitem__text}>{el.date}</p>
                </div>
                <p className={s.forum__messageitem__text_answer}> {el.text}</p>
              </div>
            </summary>
            <ReplyItemForum array={el.topicReply} />
          </details>
        </li>
      ))}
    </ul>
  );
};

export default MessageItemForum;
