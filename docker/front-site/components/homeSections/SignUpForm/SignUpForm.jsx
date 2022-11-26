import { useState } from "react";
import s from "./SignUpForm.module.scss";
import Image from "next/image";
import noAvatar from "../../../assets/img/home/desktop/noavatar-desk-1x.png";
import Close from "../../../assets/icon/close.svg";
import Google from "../../../assets/icon/google-svgrepo-com 1.svg";
import Steam from "../../../assets/icon/steam.svg";
import ThreeDots from "../../shared/ThreeDots/ThreeDots";

const initialState = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  checkPriv: false,
};

const SignUpForm = ({ active, setActive }) => {
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
    <div className={`layout default ${s.signup}`}>
      <h2 className="visually-hidden"> Sign Up One Pirate Peso</h2>
      <div className={s.signup__signup}>
        <form className={s.signup__form}>
          <legend className={s.signup__title}>Sign Up Form</legend>
          <div className={s.signup__input_fields}>
            <input
              className={s.signup__input}
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
              className={s.signup__input}
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
              className={s.signup__input}
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
              className={s.signup__input}
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
          <div className={s.signup__avatar}>
            <p className={s.signup__avatar_text}>
              Please, select your game avatar..
            </p>
            <div className={s.signup__avatar_choose}>
              <button type="button" className={s.signup__avatar_btn}>
                Choose an avatar:
              </button>
              <div className={s.signup__avatar_img}>
                <Image src={noAvatar} width={68} height={68} alt="X" />
                <ThreeDots />
              </div>
            </div>
          </div>
          <div className={s.signup__checkbox}>
            <label htmlFor="agreePriv" className={s.signup__checklabel}>
              <input
                type="checkbox"
                id="agreePriv"
                name="agreePriv"
                onChange={() => {
                  setForm({ ...form, checkPriv: !form.checkPriv });
                }}
                checked={form.checkPriv}
                className={s.signup__check}
              />
              <span className={s.signup__checkbox_sqcheck}>&#10004;</span>
              <span className={s.signup__checkbox_sq}></span>
              <p>
                By using our service you fully agree with our&nbsp;
                <a href="#" className={s.signup__labeltext}>
                  Privacy Policy
                </a>
                ..
              </p>
            </label>
          </div>
          <button className={s.signup__btn_submit}>
            <p className={s.signup__text_submit}>Create My Account</p>
          </button>
        </form>
        <div className={s.signup__account}>
          <p className={s.signup__text_reg}>Or, register using your account:</p>
          <button className={s.signup__btn_account}>
            <p className={s.signup__text_auth}>
              <Image
                src={Google}
                width={35}
                height={35}
                alt="Google"
                className={s.signup__img}
              />
              Continue with Google
            </p>
          </button>
          <button className={s.signup__btn_account}>
            <p className={s.signup__text_auth}>
              <Image
                src={Steam}
                width={35}
                height={35}
                alt="Steam"
                className={s.signup__img}
              />
              Continue with Steam
            </p>
          </button>
          <div className={s.signup__error}>
            <div className={s.signup__error_text}>
              <p className={s.signup__title_error}>Error!</p>
              <p className={s.signup__text_err}>
                @ The headsail can be masthead-rigged or fractional-rigged. On a
                masthead-rigged sloop, the forestay (on which the headsail is
                carried) attaches at the top of the mast.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={s.signup__bottom}>
        <button
          type="button"
          onClick={() => setActive(false)}
          className={s.signup__btn}
        >
          <p className={s.signup__btn_text}> Close</p>
          <Image src={Close} width={30} height={30} alt="X" />
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
