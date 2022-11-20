const PrivPolLic = () => {
  return (
    <div className="">
      <button
        type="button"
        onClick={() => setActive(false)}
        className={s.modal__btn}
      >
        <p className={s.modal__btn_text}> Close</p>
        <Image src={Close} width={30} height={30} />
      </button>
    </div>
  );
};

export default PrivPolLic;
