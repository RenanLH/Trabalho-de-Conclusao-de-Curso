import React from 'react';

interface SelectLanguageProps {
  changeLanguage: (language: string) => void;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ changeLanguage }) => {



  return (
    <div className="flex gap-4 items-center notranslate">
      <span className="flag-icon flag-icon-br" onClick={() => changeLanguage('pt')}></span>
      <span className="flag-icon flag-icon-es" onClick={() => changeLanguage('es')}></span>
      <span className="flag-icon flag-icon-us" onClick={() => changeLanguage('en')}></span>
    </div>
  );
};

export default SelectLanguage;