"use client";
import * as s from "./form.module.scss";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import profilePic from "../../../assets/img/home/desktop/enquete-captcha-voorbeeld.jpg";
import axios from "axios";
import ButtonMain from "../../shared/ButtonMain";
import { en } from '../../../locales/en';
import  {uk}  from '../../../locales/uk';

export const HomeFormContent = () => {
  const locale = "uk";
  const t = locale === 'en' ? en : uk;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "name") {
      setName(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "message") {
      setMessage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedBackData = { name, email, message };
    console.log(feedBackData);

    // запрос для добавления отзыва в базу данных, адрес пока условный,
    //  так как бека еще нет, потом поменям в случае чего
    // пока закомментировала, чтоб ошибку в консоль не било

    // const addFeedback = async()=>{
    //   try {
    //     await axios.post('http://localhost:3001/api/feedback/add', feedBackData)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    // addFeedback();

    reset();
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={s.background}>
      <div className="layout default ">
        <div className={s.container}>
          <h2 className={s.title}>{t.feedBackTitle}</h2>
          <p className={s.text}>{t.feedBackText}</p>

          <p className={s.text_form}>{t.dropUsALine} </p>
          <form onSubmit={handleSubmit}>
            <input
              className={s.input}
              type="text"
              placeholder={`${t.name}`}
              name="name"
              pattern="^[a-zA-Zа-яА-Я0-9_-]{3,16}$"
              title="Name may contain only letters, apostrophe, dash and spaces, 3-16 symbols. "
              required
              value={name}
              onChange={handleChange}
            />

            <input
              className={s.input}
              type="email"
              placeholder={`${t.email}`}
              name="email"
              pattern="^([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([A-Za-z]{1,}\.){1,2}[a-z]{2,4}$"
              title="The part of the email with the username can contain Latin letters, numbers, dot, hyphen, underscore."
              required
              value={email}
              onChange={handleChange}
            />

            <input
              className={s.input}
              type="text"
              placeholder={`${t.message}`}
              name="message"
              pattern="^[0-9A-Za-zА-Яа-яЁё]{10,200}*$"
              title="10 to 200 symbols, numbers and letters"
              required
              value={message}
              onChange={handleChange}
            />

            <div className={s.btn_container}>
              <Image src={profilePic} alt="Capcha" className={s.capcha} />

              <ButtonMain type="submit" text={`${t.btnSendMessage}`} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
