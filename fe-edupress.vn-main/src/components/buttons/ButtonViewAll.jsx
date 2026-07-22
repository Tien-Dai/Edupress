

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

const ButtonViewAll = ({nameLink}) => {
    const { t } = useTranslation();
    return (
        <button 
            className="
                border-[1px] border-[#9D9D9D] rounded-[24px] w-[100px] h-[25px] lg:w-[120px] lg:h-[30px] group
                transform transition-transform duration-300 ease-in-out flex items-center justify-center
                hover:shadow-md hover:scale-110
            "
        >
            <Link className="text-[10px] lg:text-[14px] font-medium text-[#000000] group-hover:text-[#FF782D]" to={nameLink}> {t('home.title_Home.btn')} </Link>
        </button>
    )
}   

export default ButtonViewAll;