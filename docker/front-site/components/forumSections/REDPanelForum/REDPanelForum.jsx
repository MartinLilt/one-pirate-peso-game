import ThreeDots from "../../shared/ThreeDots/ThreeDots";
import s from "./REDPanelForum.module.scss";

const REDPanelForum = ({ isOwn }) => {
  return (
    <div className={s.redpanel}>
      <div className={s.redpanel__btn_container}>
        <button className={s.redpanel__btn}>Reply</button>
        <ThreeDots ulClassName={s.redpanel__threedot_vert}
          liClassName={s.redpanel__dot_vert}/>
      </div>
      <div className={s.redpanel__btn_container}>
        <button disabled={!isOwn} className={s.redpanel__btn}>
          Edit
        </button>
        <ThreeDots ulClassName={s.redpanel__threedot_vert}
          liClassName={s.redpanel__dot_vert} />
      </div>
      <div className={s.redpanel__btn_container}>
        <button disabled={!isOwn} className={s.redpanel__btn}>
          Delete
        </button>
        <ThreeDots
          ulClassName={s.redpanel__threedot_vert}
          liClassName={s.redpanel__dot_vert}
        />
      </div>
    </div>
  );
};

export default REDPanelForum;
