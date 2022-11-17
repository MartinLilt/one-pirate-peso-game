"use client";
import * as s from "./new.module.scss";
import React, { useEffect, useState } from "react";

const convertMs = (ms) => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = String(Math.floor(ms / day)).padStart(2, "0");
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, "0");
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    "0"
  );
  // Remaining seconds
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, "0");

  return { days, hours, minutes, seconds };
};

export const HomeNewContent = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const updateDate = Date.parse("May 5, 2023");

  const updateTimer = () => {
    setInterval(() => {
      const today = new Date();
      const todayDate = Date.parse(today);
      let timer = updateDate - todayDate;
      const { days, hours, minutes, seconds } = convertMs(timer);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
      return { days, hours, minutes, seconds };
    }, 1000);
  };

  useEffect(() => {
    updateTimer();
  }, []);

  return (
    <div className={s.new}>
      <div className={s.bgshadow}></div>
      <div className={`layout default container ${s.newupdate}`}>
        <h2 className={s.newupdate__title}>News preview</h2>
        <p className={s.newupdate__text}>
          The video shows one guild attacking another guild. Enjoy the gameplay
          right now.
        </p>
        <div className={s.newupdate__timer}>
          <h3 className={s.newupdate__title_large}>Until the next update:</h3>
          <div className={s.newupdate__timer__all}>
            <div className={s.newupdate__timer__field}>
              <span className={s.newupdate__timer__value} data-days>
                {days}
              </span>
              <span className={s.newupdate__timer__label}>Days</span>
            </div>
            <ul className={s.newupdate__timer__threedot}>
              <li className={s.newupdate__timer__dot}></li>
              <li className={s.newupdate__timer__dot}></li>
              <li className={s.newupdate__timer__dot}></li>
            </ul>
            <div className={s.newupdate__timer__field}>
              <span className={s.newupdate__timer__value} data-hours>
                {hours}
              </span>
              <span className={s.newupdate__timer__label}>Hours</span>
            </div>
            <ul className={s.newupdate__timer__threedot}>
              <li className={s.newupdate__timer__dot}></li>
              <li className={s.newupdate__timer__dot}></li>
              <li className={s.newupdate__timer__dot}></li>
            </ul>
            <div className={s.newupdate__timer__field}>
              <span className={s.newupdate__timer__value} data-minutes>
                {minutes}
              </span>
              <span className={s.newupdate__timer__label}>Minutes</span>
            </div>
            <ul className={s.newupdate__timer__threedot}>
              <li className={s.newupdate__timer__dot}></li>
              <li className={s.newupdate__timer__dot}></li>
              <li className={s.newupdate__timer__dot}></li>
            </ul>
            <div className={s.newupdate__timer__field}>
              <span className={s.newupdate__timer__value} data-seconds>
                {seconds}
              </span>
              <span className={s.newupdate__timer__label}>Seconds</span>
            </div>
          </div>
        </div>
        <a href="#" className={s.newupdate__link}>
          View the latest update here
        </a>
      </div>
    </div>
  );
};
