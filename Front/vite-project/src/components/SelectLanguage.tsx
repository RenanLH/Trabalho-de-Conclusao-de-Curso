import React from 'react';

interface SelectLanguageProps {
  language: string | null;
  changeLanguage: (language: string) => void; 
  className?: string;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({language, changeLanguage, className }) => {

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    sessionStorage.setItem("language", selectedLanguage);
    changeLanguage(selectedLanguage);  
  };

  return (
    <div>
      <select className={`form-select ${className}`} value={language? language: "pt"} onChange={handleLanguageChange}>
        <option value="pt">Português</option>
        <option value="es">Espanhol</option>
        <option value="en">Ingles</option>
      </select>
    </div>
  );
};

export default SelectLanguage;