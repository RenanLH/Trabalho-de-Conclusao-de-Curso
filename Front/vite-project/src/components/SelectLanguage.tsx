
import React from 'react';

interface SelectLanguageProps {
  changeLanguage: (language: string) => void; 
  className?: string;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ changeLanguage, className }) => {

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);  
  };

  return (
    <div>
      <select className={`form-select ${className}`} onChange={handleLanguageChange}>
        <option value="pt">Português</option>
        <option value="es">Espanhol</option>
        <option value="en">Ingles</option>
      </select>
    </div>
  );
};

export default SelectLanguage;