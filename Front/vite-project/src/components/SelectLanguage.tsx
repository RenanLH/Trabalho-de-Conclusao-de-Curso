
import React from 'react';

// Tipagem para as props, incluindo a função `changeLanguage`
interface SelectLanguageProps {
  changeLanguage: (language: string) => void; // A função que será chamada no componente pai
  className?: string;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ changeLanguage, className }) => {

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);  // Chama a função `changeLanguage` passada como prop
  };

  return (
    <div>
      <select className={`form-select ${className}`} onChange={handleLanguageChange}>
        <option value="pt">Portugues</option>
        <option value="es">Espanhol</option>
        <option value="en">Ingles</option>
      </select>
    </div>
  );
};

export default SelectLanguage;