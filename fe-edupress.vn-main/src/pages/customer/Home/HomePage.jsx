import Banner from "./BoxBanner/Banner";
import BoxShowCategory from "../../customer/Home/BoxShowCategory/BoxShowCategory";
import useFetchData from "../../../api/useFetchData";
import BoxShowFeaturedCourse from "./BoxShowfeaturedCourse/BoxShowFeaturedCourse";
// import BoxShowNewCourse from "./BoxShowNewCour/BoxShowNewCourse";
import BoxBannerSmall from "../../../components/BoxBannerSmall";
import BoxOverviewInstructor from "./BoxOverviewInstructor/BoxOverviewInstructor";
import BoxShowCourseCategory from "./BoxShowCourseCategory/BoxShowCourseCategory";
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const { t } = useTranslation();

    const { data: categories, loading } = useFetchData("categories");
    const { data: courses, loading: loadingCourse } = useFetchData("courses");

    return (
        <div>
            {/* Banner */}
            <Banner />

            <div className="max-w-[1080px] px-[15px] lg:px-0 mx-auto relative">

                {/* Danh mục */}
                <BoxShowCategory
                    categories={categories}
                    loading={loading}
                />

                {/* Khóa học nổi bật */}
                <BoxShowFeaturedCourse
                    courses={courses}
                    loading={loadingCourse}
                    btnsw="feature"
                />

                {/* Khóa học mới */}
                {/*
                <BoxShowNewCourse
                    courses={courses}
                    loading={loadingCourse}
                    btnsw="newCour"
                />
                */}

                {/* Banner quảng cáo */}
                <BoxBannerSmall
                    titleSmall={t("home.banner_Small.title_small")}
                    title={t("home.banner_Small.title_big")}
                    content={t("home.banner_Small.content")}
                    color1="#B5FFE7"
                    color2="#FDC1C1"
                    img="/images/banner-ptweb.png"
                />

                {/* Giảng viên */}
                <BoxOverviewInstructor />

                {/* Phát triển web */}
                <BoxShowCourseCategory
                    courses={courses}
                    loading={loadingCourse}
                    categories={categories}
                    category="Phát triển web"
                    btnsw="courCate1"
                />



            </div>
        </div>
    );
};

export default HomePage;