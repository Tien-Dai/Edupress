import { Spin } from "antd";
import BoxCourse from "../../../../components/BoxCourse";
import { useMemo } from "react";




const BoxShowCourseFilter = (
    {
        showAll,
        loading,
        loadingCategory,
        searchKeyword,
        sortType,
        priceFilter,
    }
) => {

    const isNewCourse = (createdAt) => {

        if (!createdAt) return false;

        const diffDays =
            (Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24);

        return diffDays <= 30;
    }; 

    const filterCourses = useMemo(() => {
        if(!showAll) return null;

        let result = [...showAll];

        // search 
            if (searchKeyword) {
                result = result.filter(item => item.course_title.toLowerCase().includes(searchKeyword.toLowerCase()));
            }
        // khóa học mới
            if (sortType === "new") {
                result = result.filter(item => isNewCourse(item.created_at));
            }
        // khóa học nổi bật
            if (sortType === "featured") {
                result = result.filter(item => item.feature === true);
            }
        // khóa học miễn phí
            if (priceFilter.includes("free")) {
                result = result.filter(item => item.price === 0 );
            }
        // giá dưới 500
            if (priceFilter.includes("under500")) {
                result = result.filter(item => item.price < 500000 );
            }
        // giá dưới 500
            if (priceFilter.includes("500to1m")) {
                result = result.filter(item => item.price >= 500000 && item.price <= 1000000 );
            }
        // giá dưới 500
            if (priceFilter.includes("over1m")) {
                result = result.filter(item => item.price > 1000000 );
            }

        return result;
    }, [showAll, searchKeyword, sortType, priceFilter]);

    
    return (
        <div>
            <div className="
                grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-2
            ">
                {
                    !loading && !showAll && !loadingCategory ? (
                        <div>
                            <Spin size="large" fullscreen tip="Đang xử lý..." />
                        </div>
                    ) : (
                        filterCourses?.map((item) => (
                            <BoxCourse key={item._id} item={item} />
                        ))
                    )
                }
            </div>
            {
                filterCourses?.length === 0 && (
                    <div  
                        className="
                            text-center text-gray-300 py-10 h-[300px] flex items-center
                            justify-center border border-dashed rounded-[10px]
                        "
                    >
                        Không có khóa học nào
                    </div>
                )
            }
            {/* Pagination UI giả */}
                <div className="flex justify-center mt-8">
                    <div className="flex gap-2">
                        {/* <!-- Previous --> */}
                            <button
                                className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 
                                    hover:bg-orange-500 hover:text-white hover:border-orange-500 
                                    transition-all duration-300 ease-in-out">
                                <span className="material-icons">&#8592;</span>
                            </button>
                            {[1,2,3].map((num) => (
                                <button
                                    key={num}
                                    className={`
                                        ${num === 1 ? "bg-orange-500 text-white border-orange-500" : ""}
                                        cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700
                                        hover:bg-orange-500 hover:text-white hover:border-orange-500
                                        transition-all duration-300 ease-in-out
                                    `}
                                >
                                    {num}
                                </button>
                            ))}
                       {/* <!-- Next --> */}
                            <button
                                className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600
                                    hover:bg-orange-500 hover:text-white hover:border-orange-500
                                    transition-all duration-300 ease-in-out">
                                <span class="material-icons">&#8594;</span>
                            </button>
                    </div>
                </div>
        </div>
    )
};

export default BoxShowCourseFilter;