
import { useTranslation } from "react-i18next";
import ButtonView from "../../../../components/buttons/ButtonViewCourse";

const Banner = () => {
    const { t } = useTranslation();
    return (
        <div
            className="
                bg-gradient-to-r from-[#FFF5BE] to-[#D0F7EA] flex justify-center items-center overflow-hidden
            "
        >
            {/* <!-- Banner Background --> */}
            <div className=" w-full h-[540px] lg:h-[700px] relative group">
                {/* <!-- Image Banner --> */}
                <div
                    className="
                                absolute bottom-0 left-0 w-full h-auto transform translate-x-[-100px]
                                transition-all duration-300 ease-in-out group-hover:translate-x-0
                            "
                >
                    <img src="images/img_banner4.png" alt="banner" className="" />
                </div>
                {/* <!-- Image Banner --> */}
                <div
                    className="
                                absolute top-0 left-0 w-full h-auto transform translate-y-[-60px]
                                transition-all duration-300 ease-in-out group-hover:translate-y-0
                            "
                >
                    <img src="images/img_banner1.png" alt="banner" className="" />
                </div>
                <div
                    className="
                            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            max-w-[1080px] w-full h-auto flex items-center z-50
                        "
                >
                    {/* <!-- Content --> */}
                    <div
                        className="
                                    absolute top-1/2 transform -translate-y-1/3 lg:left-0 lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2
                                    w-[92%] sm:w-[80%] md:w-[50%] lg:w-[40%] flex flex-col gap-[16px] lg:gap-[24px]
                                    px-[16px] py-[24px] md:px-[24px] md:py-[30px] lg:p-0 bg-[#fff5becc] md:bg-[#ffffffcc] lg:bg-transparent
                                    rounded-[12px] md:rounded-[16px] lg:rounded-none
                                    backdrop-blur-sm z-[60]
                                "
                    >
                        <h1 className="text-[22px] md:text-[28px] lg:text-[48px] font-bold lg:font-semibold leading-tight">
                            {t("home.banner.title1")} <br /> {t("home.banner.title2")}
                        </h1>

                        <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#444]">
                            {t("home.banner.content")}
                        </p>

                        <div className="animate-pulse">
                            <ButtonView
                                nameLink="/"
                                title={t("home.banner.button")}
                            />
                        </div>
                    </div>
                    {/* <!-- Image Banner --> */}
                    <div
                        className="
                                    absolute right-[-40px] z-[52] scale-[90%] transform transition-all duration-300 ease-in-out
                                    group-hover:scale-[95%]
                                "
                    >
                        <img src="images/img_banner2.png" alt="banner" className="" />
                    </div>
                    {/* <!-- Image Banner --> */}
                    <div
                        className="
                                    absolute right-[-100px] z-[52] translate-x-[50px] transform transition-all duration-300 ease-in-out
                                    translate-y-[30px] lg:translate-y-[60px] lg:group-hover:translate-x-0
                                "
                    >
                        <img src="images/img_banner6.png" alt="banner" className="" />
                    </div>
                </div>
                {/* <!-- Image Banner --> */}
                <div
                    className="
                                absolute right-0 bottom-0 -translate-y-[-70px] transform transition-all duration-300 ease-in-out
                                group-hover:translate-y-0
                            "
                >
                    <img src="images/img_banner3.png" alt="banner" className="" />
                </div>
                {/* <!-- Image Banner --> */}
                <div
                    className="
                                absolute right-0 -translate-x-[-70px] transform transition-all duration-300 ease-in-out
                                group-hover:translate-x-0
                            "
                >
                    <img src="images/img_banner5.png" alt="banner" className="" />
                </div>
            </div>
        </div>
    );
}

export default Banner;