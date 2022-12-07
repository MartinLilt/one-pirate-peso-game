"use client";
import * as s from "./LanguageSection.module.scss";
import { useState } from "react";

const languages = [
  {
    locale: "en",
    name: "En",
  },
  {
    locale: "uk",
    name: "Uk",
  },
];

export default function LanguageSection() {
  const locale = "uk";
  const [selectedLang, setSelectedLang] = useState(locale);

  const handleClick = (languageLocale) => {
    setSelectedLang(languageLocale);
  };

  return (
    <div className={s.section}>
      {languages.map((language) => {
        const isActive = language.locale === locale;
        return (
          <>
            {!isActive && (
              <button
                key={language.name}
                onClick={() => handleClick(language.locale)}
              >
                {language.name}
              </button>
            )}
            {isActive && (
              <button
                key={language.name}
                onClick={() => handleClick(language.locale)}
                className={s.is_active}
              >
                {language.name}
              </button>
            )}
            
          </>
        );
      })}
      <span className={s.sign}>/</span>
    </div>

  );
  
    

}
