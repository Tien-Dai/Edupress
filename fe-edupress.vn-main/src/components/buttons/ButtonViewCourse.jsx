import { Link } from "react-router-dom";


const ButtonView = ({nameLink, title}) => {
    return (
        <Link
            to={nameLink}
            className="
                inline-flex items-center justify-center bg-[#FF782D] rounded-[24px] h-[44px] px-[20px] text-[10px]
                md:h-[48px] md:px-[24px] md:text-[16px] lg:h-[52px] lg:px-[32px] lg:text-[16px] w-[140px] lg:w-[200px] 
                font-medium text-white transition-all duration-300 ease-in-out hover:opacity-90 hover:shadow-md hover:scale-105 active:scale-95
            "
        >
            {title}
        </Link>

    )
}

export default ButtonView;