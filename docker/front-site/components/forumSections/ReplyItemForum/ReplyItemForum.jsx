import s from "./ReplyItemForum.module.scss";
import Image from "next/image";
import User from "../../../assets/icon/user.png";
const uuid = require("uuid");

const ReplyItemForum = ({ array }) => {
  return (
    <ul className={s.forum__replyitem}>
      {array.map((el) => (
        <li key={uuid.v4()} className={s.forum__replyitem_item}>
          <div className={s.forum__replyitem_lineanswer}>
            <div className={s.forum__replyitem_lineanswer_first}></div>
            <div className={s.forum__replyitem_lineanswer_second}></div>
          </div>
          <div className={s.forum__replyitem_infotitle}>
            <div className={s.forum__replyitem_avatar}>
              <div className={s.forum__replyitem_line_horiz}></div>
              <Image
                src={User}
                width={45}
                height={45}
                alt="user"
                className={s.forum__replyitem_svg}
              />
            </div>
            <div className="">
              <div className={s.forum__replyitem_message}>
                <div className={s.forum__replyitem_info}>
                  <p className={s.forum__replyitem__text}>{el.user}</p>
                  <div className={s.forum__replyitem_line}></div>
                  <p className={s.forum__replyitem__text}>{el.nameUser}</p>
                  <div className={s.forum__replyitem_line}></div>
                  <p className={s.forum__replyitem__text}>{el.date}</p>
                </div>
              </div>
              <p className={s.forum__replyitem__text_answer}> {el.text}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReplyItemForum;
