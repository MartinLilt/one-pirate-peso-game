import { useState } from "react";
import s from "./AuthForm.module.scss";
import Image from "next/image";
import noAvatar from "../../../assets/img/home/desktop/noavatar-desk-1x.png";

const initialState = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const AuthForm = () => {
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
      <form className={s.authform__form}>
        <h2 className={s.authform__title}>Sign Up Form</h2>
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
        <div className="">
          <p>Please, select your game avatar..</p>
          <div className="">
            <button>Choose an avatar:</button>
            <div className="">
              <Image src={noAvatar} width={30} height={30} alt="X" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
