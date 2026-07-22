import Breadcrumb from "../../../components/Breadcrumb";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../../api/useFetchData";
import BoxShowCourseFilter from "./BoxShowCourseFilter/BoxShowCourseFilter";
import BoxShowHeader from "./BoxShowHeader/BoxShowHeader";
import BoxFilterClick from "./BoxFilterClick/BoxFilterClick";

const CourseCategoryPage = () => {
    const { _id } = useParams();

    const { data: course, loading } = useFetchData("courses");
    const { data: categories, loading: loadingCategory } = useFetchData("categories");

    // Lấy tên danh mục theo _id
    const showNameCategory = useMemo(() => {
        if (loadingCategory) return "";
        return categories?.find(item => item._id === _id)?.cate_name || "";
    }, [categories, _id, loadingCategory]);

    // Lọc khóa học theo tên danh mục
    const showAll = useMemo(() => {
        if (loading || loadingCategory) return [];

        return (
            course?.filter(item => item.category === showNameCategory) || []
        );
    }, [course, showNameCategory, loading, loadingCategory]);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [sortType, setSortType] = useState("all");
    const [priceFilter, setPriceFilter] = useState([]);

    const handleSearch = (value) => {
        setSearchKeyword(value);
    };

    const handleSort = (e) => {
        setSortType(e.target.value);
    };

    const handlePriceFilter = (values) => {
        setPriceFilter(values);
    };

    return (
        <div className="mt-[65px] lg:mt-[60px]">
            {/* Breadcrumb */}
            <Breadcrumb
                nameCate="Trang chủ"
                showList={showAll}
                showNameCategory={showNameCategory}
            />

            {/* Main */}
            <div className="max-w-[1080px] px-[15px] lg:px-0 mx-auto relative">
                {/* Header */}
                <BoxShowHeader
                    categoryName={showNameCategory}
                    searchKeyword={searchKeyword}
                    handleSearch={handleSearch}
                />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                    {/* LEFT */}
                    <div>
                        <BoxShowCourseFilter
                            showAll={showAll}
                            loading={loading}
                            loadingCategory={loadingCategory}
                            searchKeyword={searchKeyword}
                            sortType={sortType}
                            priceFilter={priceFilter}
                        />
                    </div>

                    {/* RIGHT */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 h-fit sticky top-15">
                        <BoxFilterClick
                            sortType={sortType}
                            handleSort={handleSort}
                            handlePriceFilter={handlePriceFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCategoryPage;