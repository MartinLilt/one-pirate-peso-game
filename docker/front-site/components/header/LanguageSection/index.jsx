"use client"
import * as s from "./LanguageSection.module.scss";
import { useState } from "react";

const languages = [{
  locale: "en",
  name: "En",
},
{
  locale: "uk",
  name: "uk",
},];

export default function LanguageSection() {
  
  const locale = 'uk'
  const [selectedLang, setSelectedLang] = useState(locale);

  const handleClick = (languageLocale) => {
    setSelectedLang(languageLocale)
    // setIsPopoverOpen(false)
  }
  return (
    <div className={s.section}>
          {languages.map((language) => {
            const isActive = language.locale === locale
            return (
              <button key={language.name } onClick={() => handleClick(language.locale)} className={s.switchBtn}>
                {language.name}
                {isActive && <div className={s.active_language}></div>}
                
              </button>
              
            )
          })}
          
        </div>

    // <div className={s.section}>
    //   <button type="button">En</button>
    //   <span>/</span>
    //   <button type="button">Ua</button>
    // </div>
  );
}
