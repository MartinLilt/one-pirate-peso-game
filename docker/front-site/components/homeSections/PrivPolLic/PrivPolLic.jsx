import s from "./PrivPolLic.module.scss";
import Image from "next/image";
import Close from "../../../assets/icon/close.svg";

const PrivPolLic = ({ active, setActive, license }) => {
  return (
    <div className={`layout default ${s.privpollic}`}>
      {license && (
        <div className={s.privpollic__license}>
          <ul className={s.privpollic__list}>
            <li className={s.privpollic__item}>
              <p className={s.privpollic__text}>
                @ The headsail can be masthead-rigged or fractional-rigged.
              </p>
            </li>
            <li className={s.privpollic__item}>
              <p className={s.privpollic__text}>
                @ On a masthead-rigged sloop, the &nbsp;
                <span className={s.privpollic__text_underline}>forestay</span>
                (on which the headsail is carried) attaches at the top of the
                mast.
              </p>
            </li>
            <li className={s.privpollic__item}>
              <p className={s.privpollic__text}>
                @ The headsail can be masthead-rigged or fractional-rigged.
              </p>
            </li>
            <li className={s.privpollic__item}>
              <p className={s.privpollic__text}>
                @ On a masthead-rigged sloop, the &nbsp;
                <span className={s.privpollic__text_underline}>forestay</span>
                (on which the headsail is carried) attaches at the top of the
                mast.
              </p>
            </li>
          </ul>
          <p className={s.privpollic__text_description}>
            @ The headsail can be masthead-rigged or fractional-rigged. On a
            masthead-rigged sloop, the&nbsp;
            <span className={s.privpollic__text_description_underline}>
              forestay
            </span>
            &nbsp;(on which the headsail is carried) attaches at the top of the
            mast. On a fractional-rigged sloop, the forestay attaches to the
            mast at a point below the top. A sloop may use a&nbsp;
            <span className={s.privpollic__text_description_underline}>
              bowsprit
            </span>
            &nbsp;, a spar that projects forward from the&nbsp;
            <span className={s.privpollic__text_description_underline}>
              bow
            </span>
            . The headsail can be masthead-rigged or fractional-rigged. On a
            masthead-rigged sloop, the&nbsp;
            <span className={s.privpollic__text_description_underline}>
              forestay
            </span>
            &nbsp;(on which the headsail is carried) attaches at the top of the
            mast.
          </p>
        </div>
      )}
      {!license && (
        <div className={s.privpollic__privpol}>
          <ul className={s.privpollic__list}>
            <li className={s.privpollic__item}>
              <p className={s.privpollic__text}>
                @ The headsail can be masthead-rigged or fractional-rigged.
              </p>
            </li>
            <li className={s.privpollic__item}>
              <p className={s.privpollic__text}>
                @ On a masthead-rigged sloop, the &nbsp;
                <span className={s.privpollic__text_underline}>
                  forestay
                </span>{" "}
                (on which the headsail is carried) attaches at the top of the
                mast.
              </p>
            </li>
            <li className={s.privpollic__item}>
              <p className={s.privpollic__text}>
                @ The headsail can be masthead-rigged or fractional-rigged.
              </p>
            </li>
            <li className={s.privpollic__item}>
              <p className={s.privpollic__text}>
                @ On a masthead-rigged sloop, the &nbsp;
                <span className={s.privpollic__text_underline}>
                  forestay
                </span>{" "}
                (on which the headsail is carried) attaches at the top of the
                mast.
              </p>
            </li>
          </ul>
          <p className={s.privpollic__text_description}>
            @ The headsail can be masthead-rigged or fractional-rigged. On a
            masthead-rigged sloop, the&nbsp;
            <span className={s.privpollic__text_description_underline}>
              forestay
            </span>
            &nbsp;(on which the headsail is carried) attaches at the top of the
            mast. On a fractional-rigged sloop, the forestay attaches to the
            mast at a point below the top. A sloop may use a&nbsp;
            <span className={s.privpollic__text_description_underline}>
              bowsprit
            </span>
            &nbsp;, a spar that projects forward from the&nbsp;
            <span className={s.privpollic__text_description_underline}>
              bow
            </span>
            . The headsail can be masthead-rigged or fractional-rigged. On a
            masthead-rigged sloop, the&nbsp;
            <span className={s.privpollic__text_description_underline}>
              forestay
            </span>
            &nbsp;(on which the headsail is carried) attaches at the top of the
            mast.
          </p>
        </div>
      )}
      <div className={s.privpollic__bottom}>
        <div className={s.privpollic__links_bottom}>
          <a
            href=""
            className={license ? s.privpollic__link : s.privpollic__link_active}
          >
            Privancy Policy
          </a>
          <div className={s.privpollic__line}></div>
          <a
            href=""
            className={license ? s.privpollic__link_active : s.privpollic__link}
          >
            License
          </a>
        </div>
        <button
          type="button"
          onClick={() => setActive(false)}
          className={s.privpollic__btn}
        >
          <p className={s.privpollic__btn_text}> Close</p>
          <Image src={Close} width={30} height={30} alt="X" />
        </button>
      </div>
    </div>
  );
};

export default PrivPolLic;
