import React from 'react';
import { useTranslation } from 'react-i18next';

const SelectLogin = () => {
  const { t } = useTranslation();

  const handleLoginChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectLogin = event.target.value;

    if (selectLogin === "exit") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("idUsuario");
        window.location.href = "/home";
    }
};

  return (
    <div>
      <select defaultValue={"default"} className={`form-select login`} onChange={handleLoginChange}>
      <option disabled={true} value="default">{t("Conta")}</option>
        <option value="exit">{t("Sair")}</option>
      </select>
    </div>
  );
};

export default SelectLogin;