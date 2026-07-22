import TitleHome from "../../../../components/title/TitleHome";
import SwiperShowCourse from "../../../../components/SwiperShowCourse";
import { useTranslation } from "react-i18next";

const BoxShowCourseCategory = ({
    courses,
    loading,
    categories,
    category,
    btnsw,
}) => {
    const { t } = useTranslation();

    // Lọc khóa học theo tên danh mục
    const showCourseCategory =
        courses
            ?.filter(item => item.category === category)
            ?.sort((a, b) => a.course_title.localeCompare(b.course_title)) || [];

    return (
        <div>
            <div className="py-[30px] flex justify-between items-center">
                <TitleHome
                    title={category}
                    description={t("home.title_Home.title_5.description")}
                />
            </div>

            <SwiperShowCourse
                courses={showCourseCategory}
                loading={loading}
                btnsw={btnsw}
            />
        </div>
    );
};

export default BoxShowCourseCategory;