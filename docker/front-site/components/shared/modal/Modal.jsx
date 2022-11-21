import React from "react";
import s from "./Modal.module.scss";

import Header from "../../header/Header";

const Modal = ({ active, setActive, children }) => {
  return (
    <div className={active ? `${s.modal} ${s.active}` : `${s.modal}`}>
      <div className={` ${s.modal__content}`}>
      {children}     
      </div>
    </div>
  );
};

export default Modal;
