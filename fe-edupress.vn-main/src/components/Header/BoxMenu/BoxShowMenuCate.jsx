import { Link } from "react-router-dom";

const BoxShowMenuCate = ({ categories, loading }) => {
    return (
        <div
            className="
                submenu
                absolute left-0 top-full mt-3
                w-[300px] h-[380px]
                bg-white
                rounded-xl
                border border-[#EAEAEA]
                shadow-xl
                opacity-0 invisible
                translate-y-2 scale-95
                transition-all duration-200 ease-out
                origin-top
                group-hover:opacity-100
                group-hover:visible
                group-hover:translate-y-0
                group-hover:scale-100
                z-50
                overflow-hidden
            "
        >
            <ul className="h-full overflow-y-auto py-2">
                {loading ? (
                    <li className="px-4 py-3 text-gray-500">
                        Đang tải danh mục...
                    </li>
                ) : categories?.length > 0 ? (
                    categories.map((item) => (
                        <li
                            key={item._id}
                            className="
                                border-l-2 border-transparent
                                transition-all duration-300
                                hover:border-[#FF782D]
                                hover:bg-orange-50
                                hover:pl-5
                            "
                        >
                            <Link
                                to={`/course-category/${item._id}`}
                                className="
                                    block
                                    px-4 py-3
                                    text-[16px]
                                    font-semibold
                                    text-gray-700
                                    hover:text-[#FF782D]
                                "
                            >
                                {item.cate_name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className="px-4 py-3 text-gray-500">
                        Không có danh mục
                    </li>
                )}
            </ul>
        </div>
    );
};

export default BoxShowMenuCate;