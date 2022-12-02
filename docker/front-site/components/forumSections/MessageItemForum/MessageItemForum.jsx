import s from "./MessageItemForum.module.scss";
import Image from "next/image";
import User from "../../../assets/icon/user.svg";
const uuid = require("uuid");

const MessageItemForum = (array) => {
  return (
    <div className={s.forum__messageitem}>
      <ul>
        {array.map((el) => {
          <li key={uuid.v4()}>
            <div className={s.forum__messageitem_avatar}>
            <Image
            src={User}
            width={37.5}
            height={37.5}
            alt="user"
            className={s.forum__messageitem_svg}
          />
            </div>
            <div className={s.forum__messageitem_info}>
              <p className={s.forum__messageitem_text}>{el.user}</p>
              <div className={s.forum__messageitem_line}></div>
              <p className={s.forum__messageitem_text}>{el.nameUser}</p>
              <div className={s.forum__messageitem_line}></div>
              <p className={s.forum__messageitem_text}>{el.date}</p>
            </div>
            {el.text}
          </li>;
        })}
      </ul>
    </div>
  );
};

export default MessageItemForum;
