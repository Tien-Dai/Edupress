
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { Dropdown, Tooltip } from "antd";


const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  const items = [
    {
      key: "vi",
      label: (
        <div
          onClick={() => changeLang("vi")}
          className="flex items-center gap-2 px-2 py-1 cursor-pointer"
        >
          <ReactCountryFlag svg countryCode="VN" style={{ width: 20, height: 20 }} />
          Tiếng Việt
        </div>
      ),
    },
    {
      key: "en",
      label: (
        <div
          onClick={() => changeLang("en")}
          className="flex items-center gap-2 px-2 py-1 cursor-pointer"
        >
          <ReactCountryFlag svg countryCode="US" style={{ width: 20, height: 20 }} />
          English
        </div>
      ),
    },
  ];

  return (
    <Tooltip color={'#ffffff'} title="Ngôn ngữ" placement="bottom">
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <div className="lang-btn">
            <ReactCountryFlag
              svg
              countryCode={i18n.language === "vi" ? "VN" : "US"}
              style={{ width: 16, height: 16 }}
            />
          </div>
        </Dropdown>
    </Tooltip>
  
  );
};

export default LanguageDropdown;
