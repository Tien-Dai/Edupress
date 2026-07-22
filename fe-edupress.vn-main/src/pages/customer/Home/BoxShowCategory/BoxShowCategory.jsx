
import SwiperCategory from "./SwiperCategory";
import ButtonViewAll from "../../../../components/buttons/ButtonViewAll";
import TitleHome from "../../../../components/title/TitleHome";
import { useTranslation } from "react-i18next";

const BoxShowCategory = ({categories, loading}) => {
    const { t } = useTranslation();
    return (
        <div>
            {/* <!-- Title --> */}
                <div className="py-[30px] flex justify-between items-center">
                    {/* <!-- Title --> */}
                        <TitleHome  
                            title={t('home.title_Home.title_1.title')} 
                            description={t('home.title_Home.title_1.description')} 
                        />
                    {/* <!-- Button -->
                        <ButtonViewAll nameLink={"/categories"} /> */}
                </div>
            {/* <!-- Box Category --> */}
                <SwiperCategory categories={categories} loading={loading} />
        </div>
    )
}

export default BoxShowCategory;