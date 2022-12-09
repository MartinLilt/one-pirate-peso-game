import s from "./MessageItemForum.module.scss";
import Image from "next/image";
import ReplyItemForum from "../ReplyItemForum/ReplyItemForum";
import User from "../../../assets/icon/user.png";
const uuid = require("uuid");

const MessageItemForum = ({ array, topicText }) => {
  return (
    <div className={s.forum__messageitem__all}>
      <div className={s.forum__messageitem_topic}>
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
            <p>ghgjghj</p>
            {/* <p className={s.forum__messageitem__text}>{el.user}</p> */}
            <div className={s.forum__messageitem_line}></div>
            {/* <p className={s.forum__messageitem__text}>{el.nameUser}</p> */}
            <div className={s.forum__messageitem_line}></div>
            {/* <p className={s.forum__messageitem__text}>{el.date}</p> */}
          </div>
          <p className={s.forum__messageitem__text_answer}>{topicText}</p>
        </div>
      </div>
      {/* <p>{topicText}</p> */}
      <ul className={s.forum__messageitem}>
        {array.map((el) => (
          <li key={uuid.v4()} className={s.forum__messageitem_item}>
            <details className={s.forum__messageitem_details} >
              <summary className={s.forum__messageitem_summary}>
                <div className={s.forum__messageitem_lineanswer}>
                  <div className={s.forum__messageitem_lineanswer_first}></div>
                  {/* <div className={s.forum__messageitem_lineanswer_second}></div> */}
                </div>
                <div className={s.forum__messageitem__horiz}>
                  <div className={s.forum__messageitem_line_horiz}></div>
                  <div className={s.forum__messageitem_avatar}>
                    <Image
                      src={User}
                      width={37.5}
                      height={37.5}
                      alt="user"
                      className={s.forum__messageitem_svg}
                    />
                    <div
                      className={s.forum__messageitem__line_answer_vert}
                    ></div>
                  </div>
                </div>
                <div className={s.forum__messageitem_message}>
                  <div className={s.forum__messageitem_info}>
                    <p className={s.forum__messageitem__text}>{el.user}</p>
                    <div className={s.forum__messageitem_line}></div>
                    <p className={s.forum__messageitem__text}>{el.nameUser}</p>
                    <div className={s.forum__messageitem_line}></div>
                    <p className={s.forum__messageitem__text}>{el.date}</p>
                  </div>
                  <p className={s.forum__messageitem__text_answer}>{el.text}</p>
                </div>
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
