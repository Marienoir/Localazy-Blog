import "./App.css";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="Button-container">
          <select onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="cs">Czech</option>
          </select>
        </div>

        <p>{t("name")}</p>
        <p>{t("gender")}</p>
        <p>{t("company")}</p>
        <p>{t("address")}</p>
        <p>{t("about")}</p>
      </header>
    </div>
  );
}

export default Profile;
