import * as s from "./LanguageSection.module.scss";

export default function LanduageSection() {
  return (
    <div className={s.section}>
      <button type="button">En</button>
      <span>/</span>
      <button>Ua</button>
    </div>
  );
}
