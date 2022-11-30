import React from "react";
import s from "./Modal.module.scss";

const Modal = ({ active, children }) => {
  return (
    <div className={active ? `${s.modal} ${s.active}` : `${s.modal}`}>
      <div className={` ${s.modal__content}`}>{children}</div>
    </div>
  );
};

export default Modal;
