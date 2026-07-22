import TitleHome from "../../../../components/title/TitleHome";
import ButtonViewAll from "../../../../components/buttons/ButtonViewAll";
import SwiperShowCourse from "../../../../components/SwiperShowCourse";
import { useTranslation } from "react-i18next";

const BoxShowFeaturedCourse = ({courses, loading, btnsw}) => {
    const { t } = useTranslation();
    const showCourseFeature = courses?.filter(item => item.feature === true);
  return (
    <div>
        <div className="py-[30px] flex justify-between items-center">
            {/* <!-- Title --> */}
                <TitleHome  
                    title={t('home.title_Home.title_2.title')}
                    description={t('home.title_Home.title_2.description')} 
                />
            {/* <!-- Button --> */}
                {/* <ButtonViewAll nameLink={"/course"} /> */}
        </div>
        {/* Box show slider course featured */}
            <SwiperShowCourse courses={showCourseFeature} loading={loading} btnsw={btnsw} />
           
    </div>
    )   
}
export default BoxShowFeaturedCourse;