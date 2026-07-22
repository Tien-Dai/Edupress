

import { useScrollButtons } from "../../hooks/useScrollTopButton";
import { Link } from "react-router-dom";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import PhoneIcon from "../icons/PhoneIcon";

const FloatingButtons = () => {
  const { showTop } = useScrollButtons(300);

  return (
        <div
            className={`
                fixed bottom-2 right-2 z-50 flex flex-col gap-3
                transition-transform duration-300 ease-out will-change-transform
                ${showTop ? "-translate-y-5" : "translate-y-[40px]"}
            `}
        >
        {/* Phone */}
            <Link
                to="/"
                className="
                w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg relative
                animate-pulse border-2 border-white hover:bg-green-600 transition-all duration-300 hover:scale-110 cursor-pointer
                "
            >
                <span className="absolute inline-flex h-9 w-9 animate-ping rounded-full bg-green-400 opacity-75"></span>
                <PhoneIcon size={22} />
            </Link>

        {/* Zalo */}
            <Link
                to="/"
                className="
                w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg relative
                animate-pulse border-2 border-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 cursor-pointer
                "
            >
                <span className="absolute inline-flex h-9 w-9 animate-ping rounded-full bg-sky-400 opacity-75"></span>
                Zalo
            </Link>

        {/* Scroll to top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`
                w-11 h-11 rounded-full bg-orange-500 text-white shadow-lg
                flex items-center justify-center cursor-pointer transition-all 
                duration-300 ease-out will-change-transform hover:scale-110 ml-1

                ${showTop
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 translate-y-6 scale-95 pointer-events-none"}
                `}
                type="submit"
            >
                <ArrowUpIcon size={20} />
            </button>
        </div>

  );
}


export default FloatingButtons;