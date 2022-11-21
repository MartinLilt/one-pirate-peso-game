import { useState } from "react";
import s from "./AuthForm.module.scss";
import Image from "next/image";
import noAvatar from "../../../assets/img/home/desktop/noavatar-desk-1x.png";
import Close from "../../../assets/icon/close.svg";
import ThreeDots from "../../shared/ThreeDots/ThreeDots";

const initialState = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const AuthForm = ({ active, setActive }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "name":
        setForm({ ...form, name: value });
        break;
      case "email":
        setForm({ ...form, email: value });
        break;

      case "password":
        setForm({ ...form, password: value });
        break;

      case "repeatPassword":
        setForm({ ...form, repeatPassword: value });
        break;

      default: {
      }
    }
  };

  return (
    <div className={`layout default ${s.authform}`}>
      <h2 className="visually-hidden"> Sign Up One Pirate Peso</h2>
      <form className={s.authform__form}>
        <legend className={s.authform__title}>Sign Up Form</legend>
        <div className={s.authform__input_fields}>
          <input
            className={s.authform__input}
            type="text"
            placeholder="Your public name.."
            name="name"
            pattern="^[a-zA-Zа-яА-Я0-9_-]{3,16}$"
            title="Name may contain only letters, apostrophe, dash and spaces, 3-16 symbols. "
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            className={s.authform__input}
            type="email"
            placeholder="Your email.."
            name="email"
            pattern="^([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([A-Za-z]{1,}\.){1,2}[a-z]{2,4}$"
            title="The part of the email with the username can contain Latin letters, numbers, dot, hyphen, underscore."
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            className={s.authform__input}
            type="password"
            placeholder="Your password.."
            name="password"
            pattern="^([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})"
            title="Password can contain Latin letters, numbers, hyphen, underscore."
            required
            value={form.password}
            onChange={handleChange}
          />
          <input
            className={s.authform__input}
            type="repeatPassword"
            placeholder="Reapeat your password.."
            name="repeatPassword"
            pattern="^([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})"
            title="Password can contain Latin letters, numbers, hyphen, underscore."
            required
            value={form.repeatPassword}
            onChange={handleChange}
          />
        </div>
        <div className={s.authform__avatar}>
          <p className={s.authform__avatar_text}>
            Please, select your game avatar..
          </p>
          <div className={s.authform__avatar_choose}>
            <button type="button" className={s.authform__avatar_btn}>
              Choose an avatar:
            </button>
            <div className={s.authform__avatar_img}>
              <Image src={noAvatar} width={68} height={68} alt="X" />
            </div>
            <ThreeDots />
          </div>
        </div>
        <div cclassName={s.authform__checkbox}>
          <input
            type="checkbox"
            id="agreePriv"
            name="agreePriv"
            className={s.authform__check}
          />
          <label htmlFor="agreePriv" className={s.authform__checklabel}>
            By using our service you fully agree with our&nbsp;
            <a href="#" className={s.authform__labeltext}>
              Privacy Policy
            </a>
            ..
          </label>
        </div>
      </form>
      <div className={s.authform__bottom}>
        <button
          type="button"
          onClick={() => setActive(false)}
          className={s.authform__btn}
        >
          <p className={s.authform__btn_text}> Close</p>
          <Image src={Close} width={30} height={30} alt="X" />
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
