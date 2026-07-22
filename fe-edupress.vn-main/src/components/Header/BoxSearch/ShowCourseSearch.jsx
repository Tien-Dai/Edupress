
import { Input, Empty, Spin } from "antd";
import SearchIcon from "../../../components/icons/SearchIcon";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import CloseIcon from "../../../components/icons/CloseIcon";

const ShowCourseSearch = ({keyword, setKeyword, results, loading, onclose}) => {
    const [searchLoading, setSearchLoading] = useState(false);
    useEffect(() => {
        if (!keyword) {
            setSearchLoading(false);
            return;
        }

        setSearchLoading(true);

        const timer = setTimeout(() => {
            setSearchLoading(false);
        }, 300); 

        return () => clearTimeout(timer);
    }, [keyword]);

    return (
        <div
            className="
                flex flex-col items-center justify-center lg:p-2 relative
            "
        >
            <h1 className="text-[16px] md:text-[18px] lg:hidden font-semibold mb-2">Tìm kiếm khóa học</h1>
            <div
                className="
                    bg-white rounded-2xl shadow-xl lg:p-4
                    w-full md:w-[360px] lg:w-[420px]
                "
            >
                {/* Input */}
                <Input
                    autoFocus
                    placeholder="Tìm khóa học..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    prefix={<SearchIcon size={16} />}
                    className="inputSearch"
                />

                {/* Results */}
               <div className="mt-4 max-h-[100vh] sm:max-h-[320px] overflow-y-auto">
                    { (loading || searchLoading) ? (
                        <div className="flex justify-center py-8">
                            <Spin />
                        </div>
                    ) : results && results.length ? (
                        <div>
                            <h1 className="py-[2px] pl-[10px] text-[12px] md:text-[14px] lg:text-[16px] text-[#000000] font-semibold border-l-[4px] border-l-[#ffa25f]">
                                {keyword ? "Kết quả tìm kiếm" : "Khóa học nổi bật"}
                            </h1>

                            {results.map(item => (
                                <div
                                    key={item._id}
                                    className="flex gap-3 p-3 rounded-xl hover:bg-[#e6e6e6] transition relative"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.course_title}
                                        className="w-full h-auto max-w-[100px] sm:w-14 sm:h-14 rounded-lg object-cover"
                                    />

                                    {
                                        item.feature === true && (
                                            <span className="absolute top-[5px] left-[5px] bg-[#fff1d9] text-[#ff0000] text-[12px] font-bold rounded-full">
                                                ⭐
                                            </span>
                                        )
                                    }

                                    <div className="flex-1">
                                        <Link 
                                            to={`/detail/${item._id}`}
                                            onClick={onclose}
                                        >
                                            <h4 
                                                className="
                                                    text-[10px] md:text-[12px] lg:text-[14px] font-bold lg:font-semibold text-[#000000] 
                                                    line-clamp-2 cursor-pointer transform transition duration-300 esease-in-out hover:text-[#FF782D]
                                                "
                                            >
                                                {item.course_title}
                                            </h4>
                                        </Link>
                                        <p className="text-xs text-gray-500">{item.author}aaa</p>
                                        <p className="text-sm font-medium text-[#ff0000]">
                                        {item.price === 0
                                            ? <span className="text-green-400 font-semibold">Free</span>
                                            : `${Number(item.price).toLocaleString("vi-VN")} VND`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Empty description="Không tìm thấy khóa học 😢" />
                    )}
                    </div>

            </div>
        </div>
    )
};

export default ShowCourseSearch;