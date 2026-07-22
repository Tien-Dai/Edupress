"use client";

import { Link } from "react-router-dom";
import { categoryIconMap } from "../../../../constants/category-icon-map";


const BoxCateGory = ({ item }) => {
  const Icon = categoryIconMap[item.icon_key];

    if (item.isSkeleton) {
        return (
            <button 
                className="
                    cate-btn w-full h-[100px] md:h-[140px] lg:h-[180px] bg-[#d8d8d8] rounded-[20px] 
                    animate-pulse flex justify-center items-center text-[10px] md:text-[14px] lg:text-[16px]
                "
            >
                Loading...
            </button>
        );
    }

    return (
        <div key={item._id}>
            <Link 
                to={`/course-category/${item._id}`}
                className="cate-btn flex flex-col justify-center items-center gap-[5px] group
                w-full h-[100px] md:h-[140px] lg:h-[180px] border-[2px] border-[#EAEAEA] rounded-[10px] md:rounded-[15px] lg:rounded-[20px] px-[10px]
                transform transition-transform duration-300 ease-in-out cursor-pointer
                hover:shadow-2xl"
                
            >
                {
                    Icon && 
                        <Icon 
                            size={24} 
                            className="
                                w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] text-[#FF782D] transform duration-300 
                                ease-in-out group-hover:scale-110
                            " 
                        />
                }
                <h4 
                    className="
                        text-[10px] md:text-[14px] lg:text-[16px] font-semibold text-[#000000] 
                        group-hover:text-[#FF782D] text-center
                    "
                >
                    {item.cate_name}
                </h4>
                <p className="hidden md:block md:text-[12px] lg:text-[14px] text-[#555555]">{item.quantity} Courses</p>
            </Link> 
        </div>
    );
};

export default BoxCateGory;
