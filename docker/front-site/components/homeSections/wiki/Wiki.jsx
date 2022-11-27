import * as s from "./wiki.module.scss";
import React from "react";
import Image from "next/image";
import ship from "../../../assets/img/wiki/modile/ship.jpg";
import logoWiki from "../../../assets/img/wiki/desktop/logoWiki.svg";

const options = {
  points: "2500.hp",
  armor: "2.am",
  harpoons: "4.un",
  weapons: "200.m",
  ultimate_ability: "none",
  range_of_sight: "350.m",
  speed: "9.2.knots",
  cannons: "6.un",
};

export const HomeWikiContent = () => {
  const {
    points,
    armor,
    harpoons,
    weapons,
    ultimate_ability,
    range_of_sight,
    speed,
    cannons,
  } = options;
  return (
    <div>
      <div className={s.web_container}>
        <div className={s.img_container}>
          <Image
            src={ship}
            width={280}
            height={171}
            alt="ship"
            className={s.img_wiki}
          />
          <Image
            src={logoWiki}
            width={65.52}
            height={43}
            alt="logo"
            className={s.logo}
          />
        </div>

        <div className={s.web_text}>
          <Image
            src={logoWiki}
            width={65.52}
            height={43}
            alt="logo"
            className={s.logo_wiki}
          />
          <h2 className={s.title_wiki}>British ship: “Sloop”.</h2>
          <p className={s.text_wiki}>
            The headsail can be masthead-rigged or fractional-rigged. On a
            masthead-rigged sloop, the forestay (on which the headsail is
            carried) attaches at the top of the mast. On a fractional-rigged
            sloop, the forestay attaches to the mast at a point below the top. A
            sloop may use a bowsprit, a spar that projects forward from the bow.
          </p>
          <div className={s.line_wiki} />
        </div>
      </div>

      <ul className={s.options_wiki}>
        <li>
          Hit Points:<span>{points}</span>
        </li>
        <li>
          Base Speed:<span>{speed}</span>
        </li>
        <li>
          Base Armor:<span>{armor}</span>
        </li>
        <li>
          Max. Cannons:<span>{cannons}</span>
        </li>
        <li>
          Max. Harpoons:<span>{harpoons}</span>
        </li>
        <li>
          Max. Weapons range:<span>{weapons}</span>
        </li>
        <li>
          Ultimate Ability:<span>{ultimate_ability}</span>
        </li>
        <li>
          Max. Range of Sight: <span>{range_of_sight}</span>
        </li>
      </ul>
      <h2 className={s.link_wiki}>Read more on the Wiki page</h2>
    </div>
  );
};
