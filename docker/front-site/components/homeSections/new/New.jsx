import * as s from "./new.module.scss";
import React from "react";
 
export const HomeNewContent = () => {
  return (
    <div className={s.new}>
     <div className={`container ${s.newupdate}`}>
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
              00
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
              00
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
              00
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
              00
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
