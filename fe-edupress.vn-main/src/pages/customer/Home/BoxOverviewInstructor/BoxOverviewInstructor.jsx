
import { useTranslation } from "react-i18next";
import ButtonView from "../../../../components/buttons/ButtonViewCourse";

const BoxOverviewInstructor = () => {
    const { t } = useTranslation();
    return (
        <section className="">
            {/* ===== Box tổng quan ===== */}
            <div className="
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                gap-[15px] lg:gap-[20px]
            ">
                <div className="bg-[#F5F5F5] h-[160px] md:h-[180px] rounded-[20px] flex flex-col justify-center items-center">
                    <h2 className="text-[#FF782D] text-[28px] md:text-[32px] font-semibold">🎓 50.000+</h2>
                    <p className="text-[16px] md:text-[18px] font-medium">{t("home.overview_instructor.box_overview.box_1")}</p>
                </div>

                <div className="bg-[#F5F5F5] h-[160px] md:h-[180px] rounded-[20px] flex flex-col justify-center items-center">
                    <h2 className="text-[#FF782D] text-[28px] md:text-[32px] font-semibold">📚 120+</h2>
                    <p className="text-[16px] md:text-[18px] font-medium">{t("home.overview_instructor.box_overview.box_2")}</p>
                </div>

                <div className="bg-[#F5F5F5] h-[160px] md:h-[180px] rounded-[20px] flex flex-col justify-center items-center">
                    <h2 className="text-[#FF782D] text-[28px] md:text-[32px] font-semibold">👨‍🏫 35+</h2>
                    <p className="text-[16px] md:text-[18px] font-medium">{t("home.overview_instructor.box_overview.box_3")}</p>
                </div>

                <div className="bg-[#F5F5F5] h-[160px] md:h-[180px] rounded-[20px] flex flex-col justify-center items-center">
                    <h2 className="text-[#FF782D] text-[28px] md:text-[32px] font-semibold">🌟 100%</h2>
                    <p className="text-[16px] md:text-[18px] font-medium">{t("home.overview_instructor.box_overview.box_4")}</p>
                </div>
            </div>

            {/* ===== Box nội dung ===== */}
            <div className="
                flex flex-col lg:flex-row gap-[30px] lg:gap-[60px]
                mt-[30px] items-center
            ">
                <div className="w-full lg:w-1/2 flex justify-center border-[1px] border-[#EAEAEA] rounded-[20px]">
                    <img
                        src="/images/banner-overviewInstr.png"  
                        alt="Tổng quan EduPress"
                        className="w-[90%] md:w-[70%] lg:w-full h-auto"
                    />
                </div>

                <div 
                    className="
                        w-full lg:w-1/2 text-center lg:text-left border-[1px] p-[10px] border-[#EAEAEA] rounded-[20px]
                         md:border-none md:rounded-none flex flex-col gap-[20px]
                    "
                >
                    <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold">
                        {t("home.overview_instructor.box_instructor.title")}
                    </h2>

                    <p className="text-[16px] md:text-[18px] text-[#555555] ">
                        {t("home.overview_instructor.box_instructor.description")}
                    </p>

                    <div className="space-y-[12px] text-left md:text-center lg:text-left">
                        <p className="text-[16px] md:text-[18px]">✅ {t("home.overview_instructor.box_instructor.benefits.benefit_1")}</p>
                        <p className="text-[16px] md:text-[18px]">✅ {t("home.overview_instructor.box_instructor.benefits.benefit_2")}</p>
                        <p className="text-[16px] md:text-[18px]">✅ {t("home.overview_instructor.box_instructor.benefits.benefit_3")}</p>
                        <p className="text-[16px] md:text-[18px]">✅ {t("home.overview_instructor.box_instructor.benefits.benefit_4")}</p>
                    </div>

                    <div>
                        <ButtonView nameLink="/register-provider" title={t("home.overview_instructor.btn")} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BoxOverviewInstructor;
