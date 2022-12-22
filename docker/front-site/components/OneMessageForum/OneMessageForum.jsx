import s from "./OneMessageForum.module.scss";
import Image from "next/image";

const OneMessageForum = ({
  isAnswer,
  UserImage,
  user,
  nameUser,
  date,
  topicText,
}) => {
  return (
    <div className={s.forum__onemessage}>     
      <div className={isAnswer && `${s.forum__onemessage__horiz}`||
            `${s.forum__onemessage_horavatar}`}>
        <div
          className={
            (isAnswer && `${s.forum__onemessage_avatar_answer}`) ||
            `${s.forum__onemessage_avatar}`
          }
        >
          <Image
            src={UserImage}
            width={37.5}
            height={37.5}
            alt="userAvatar"
            className={s.forum__onemessage_svg}
          />
          <div className={s.forum__onemessage__line_answer_vert}></div>
        </div>
      </div>
      <div className={s.forum__onemessage_message}>
        <div className={s.forum__onemessage_info}>
          <p className={s.forum__onemessage__text}>{user}</p>
          <div className={s.forum__onemessage_line_question}></div>
          <p className={s.forum__onemessage__text}>{nameUser}</p>
          <div className={s.forum__onemessage_line_question}></div>
          <p className={s.forum__onemessage__text}>{date}</p>
        </div>
        <p className={s.forum__onemessage__text_answer}>{topicText}</p>
      </div>
    </div>
  );
};

export default OneMessageForum;
