import { useState } from "react";
import s from "./LogInForm.module.scss";
import Image from "next/image";
import Close from "../../../assets/icon/close.svg";
import Google from "../../../assets/icon/google-svgrepo-com 1.svg";
import Steam from "../../../assets/icon/steam.svg";

const initialState = {
  email: "",
  password: "",
};

const LogInForm = ({ active, setActive }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "email":
        setForm({ ...form, email: value });
        break;

      case "password":
        setForm({ ...form, password: value });
        break;

      default: {
      }
    }
  };

  return (
    <div className={`layout default ${s.login}`}>
      <h2 className="visually-hidden"> Log In One Pirate Peso</h2>
      <div className={s.login__login}>
        <form className={s.login__form}>
          <legend className={s.login__title}>Log In Form</legend>
          <div className={s.login__input_fields}>
            <input
              className={s.login__input}
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
              className={s.login__input}
              type="password"
              placeholder="Your password.."
              name="password"
              pattern="^([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})"
              title="Password can contain Latin letters, numbers, hyphen, underscore."
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button className={s.login__btn_submit}>
            <p className={s.login__text_submit}>Log in to My Account</p>
          </button>
        </form>
        <div className={s.login__account}>
          <p className={s.login__text_reg}>Or, register using your account:</p>
          <button className={s.login__btn_account}>
            <p className={s.login__text_auth}>
              <Image
                src={Google}
                width={35}
                height={35}
                alt="Google"
                className={s.login__img}
              />
              Continue with Google
            </p>
          </button>
          <button className={s.login__btn_account}>
            <p className={s.login__text_auth}>
              <Image
                src={Steam}
                width={35}
                height={35}
                alt="Steam"
                className={s.login__img}
              />
              Continue with Steam
            </p>
          </button>
        </div>
        <div className={s.login__error}>
          <div className={s.login__error_text}>
            <p className={s.login__title_error}>Error!</p>
            <p className={s.login__text_err}>
              @ The headsail can be masthead-rigged or fractional-rigged. On a
              masthead-rigged sloop, the forestay (on which the headsail is
              carried) attaches at the top of the mast.
            </p>
          </div>
        </div>
      </div>

      <div className={s.login__bottom}>
        <button
          type="button"
          onClick={() => setActive(false)}
          className={s.login__btn}
        >
          <p className={s.login__btn_text}> Close</p>
          <Image src={Close} width={30} height={30} alt="X" />
        </button>
      </div>
    </div>
  );
};

export default LogInForm;
