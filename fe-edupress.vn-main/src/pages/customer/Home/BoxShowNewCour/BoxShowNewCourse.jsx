


import TitleHome from "../../../../components/title/TitleHome";
import ButtonViewAll from "../../../../components/buttons/ButtonViewAll";
import SwiperShowCourse from "../../../../components/SwiperShowCourse";
import { useTranslation } from "react-i18next";

const BoxShowNewCourse = ({courses, loading, btnsw}) => {
    const { t } = useTranslation();
    const isNewCourse = (createdAt) => {
        if (!createdAt) return false;

        const diffDays =
            (Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24);

        return diffDays <= 30;
        };

        const newCourses = courses?.filter(item =>
        isNewCourse(item.created_at)
    );


  return (
    <div>
        <div className="py-[30px] flex justify-between items-center">
            {/* <!-- Title --> */}
                <TitleHome  
                    title={t('home.title_Home.title_3.title')}
                    description={t('home.title_Home.title_3.description')}
                />
            {/* <!-- Button --> */}
                {/* <ButtonViewAll nameLink={"/course"} /> */}
        </div>
        {/* Box show slider course featured */}
            <SwiperShowCourse courses={newCourses} loading={loading} btnsw={btnsw} />
           
    </div>
    )   
}
export default BoxShowNewCourse;