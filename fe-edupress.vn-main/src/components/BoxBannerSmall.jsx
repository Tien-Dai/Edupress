import { useTranslation } from "react-i18next";
import ButtonView from "./buttons/ButtonViewCourse";


const BoxBannerSmall = ({titleSmall, title, content, color1, color2, img}) => {
    const { t } = useTranslation();
    return (
            <section className="py-[30px]">
                <div
                    className={`
                        group w-full min-h-[280px] md:h-[324px] rounded-[20px] bg-gradient-to-r overflow-hidden
                        flex flex-col md:flex-row items-center justify-between px-[20px] md:px-[30px] lg:px-[40px] 
                    `}
                    style={{
                        backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`,
                    }}
                >
                    {/* Content */}
                    <div className="
                        flex flex-col gap-[8px]
                        w-full md:w-[55%]
                        text-center md:text-left
                    ">
                        <p className="text-[14px] md:text-[16px] pt-[10px] md:pt-0 font-semibold uppercase tracking-wide">
                            {titleSmall}
                        </p>

                        <h2 className="text-[24px] md:text-[30px] lg:text-[32px] font-semibold leading-snug">
                            {title}
                        </h2>

                        <p className="
                            text-[16px] md:text-[18px]
                            text-[#555555]
                            pt-[5px] pb-[15px]
                            leading-relaxed
                        ">
                            {content}
                        </p>

                        <div className="flex justify-center md:justify-start">
                            <ButtonView nameLink="/" title={t('home.banner.button')} />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="
                        hidden md:flex
                        justify-end items-center
                        w-[45%]
                    ">
                        <img
                            src={img}
                            alt="banner"
                            className="
                                w-[320px] lg:w-[420px] h-auto
                                transform transition-transform duration-300 ease-in-out
                                group-hover:scale-105
                            "
                        />
                    </div>
                </div>
            </section>

    )
}

export default BoxBannerSmall;