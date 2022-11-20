import React from "react";
import s from "./Modal.module.scss";

import Image from "next/image";
import Close from "../../../assets/icon/close.svg";
import Header from "../../header/Header";

const Modal = ({ active, setActive, children }) => {
  return (
    <div className={active ? `${s.modal__active}` : `${s.modal__content}`}>
      <div className={` ${s.modal}`}>
      {children}     
      </div>
    </div>
  );
};

export default Modal;
