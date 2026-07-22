

import { Button, Spin } from "antd";
import BoxEditInfoCourse from "./BoxEditInfoCourse/BoxEditInfoCourse";
import {ReloadOutlined } from "@ant-design/icons";
import useLoading from "../../../../../hooks/useLoading";


const BoxShowCourseInfo = ({ showCourse, refetch , isFetching, isLoading }) => {

    
    const loading = useLoading(isLoading || isFetching, 300);

    if (loading) {
        return (
        <div className="flex justify-center items-center h-[300px]">
            <Spin size="large" />
        </div>
        );
    }

    return(
        <div>
            <div className="flex justify-between items-center mb-3">
                <div className="border-l-[3px] border-l-[#FF7D35] pl-2">
                    <h2 className="font-semibold text-[#989898] text-[18px]">Thực hiện</h2>
                </div>
          
                <BoxEditInfoCourse course={showCourse} refetch={refetch} />
               
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Video */}
                <div 
                    className="
                        border border-gray-200 rounded-[5px] p-4 h-auto bg-[#ffffff] overflow-hidden
                    "
                    >
                    
                    <div className="aspect-video w-full flex items-center justify-center bg-gray-100">
                    {showCourse?.video_url?.trim() ? (
                        <iframe
                        className="w-full h-full"
                        src={showCourse.video_url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        />
                    ) : (
                        <p className="text-gray-400 text-sm font-semibold">
                        Chưa có video
                        </p>
                    )}
                    </div>

                </div>

            {/* Info */}
            <div 
            className="
                border border-gray-200 rounded-tl-[5px] rounded-tr-[5px] 
                rounded-b-[5px] h-auto bg-[#ffffff] overflow-hidden 
            "
            >
                <p className="bg-[#efefef] text-[#000000] px-2 py-3 text-[16px] font-bold rounded-[5px]">
                    <sup className="text-red-500 font-semibold">*</sup>Thông tin khóa học
                </p>
                <div className="px-4 py-3 space-y-3">
                <p 
                    className=" 
                    border-b border-b-[#d4d4d4]  text-[#000000] text-[14px] pb-3
                    "
                >
                    <strong className="pr-2">
                    #Mã khóa học:
                    </strong> 
                    {showCourse._id}
                </p>
                <div 
                    className="
                    flex justify-between flex-col md:flex-row border-b 
                    border-b-[#d4d4d4] pb-3
                    "
                >
                    <p className="text-[#000000] text-[14px]">
                    <strong className="pr-2">Ngày tạo:</strong> 
                        {new Date(showCourse.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                    <p className="text-[#a7a7a7] text-[14px]">—</p>
                    <p className="text-[#000000] text-[14px]">
                    <strong className="pr-2">Ngày cập nhật:</strong> 
                        {new Date(showCourse.updatedAt).toLocaleDateString("vi-VN")}
                    </p>
                </div>
                <p className="text-[#000000] text-[14px]">
                    <strong className="pr-2">Danh mục:</strong> 
                    {showCourse.category_name}
                </p>
                <p className="text-[#000000] text-[14px] ">
                    <strong className="pr-2">Giảng viên:</strong> 
                    {showCourse.provider_name}
                </p>
                <p className="text-[#000000] text-[14px]">
                    <strong className="pr-2">Số học viên:</strong> 
                    {showCourse.students}
                </p>
                <p className="text-[#000000] text-[14px]">
                    <strong className="pr-2">Thời lượng:</strong> 
                    {showCourse.duration}
                </p>
                </div>
                <div className="flex items-center justify-between px-4 pt-2 border-t border-t-[#d4d4d4] ">
                <div className="flex items-center">
                    <p className="pr-2 text-[14px] font-bold text-[#000000] ">Giá khóa học:</p> 
                    <span className="text-[#e70000] text-[18px] font-bold">
                        { showCourse.price === 0 
                            ? <span className="text-green-400 font-semibold">Free</span>
                            : `${Number(showCourse.price).toLocaleString('vi-VN')} VND`
                        }
                    </span>
                </div>
                <div className="flex items-center">
                    <p className="pr-2 text-[14px] font-bold text-[#000000] ">Giá giảm:</p> 
                    <span className="text-[#e70000] text-[18px] font-bold">
                        { showCourse.price_promotion === null || showCourse.price_promotion === 0 
                            ? <span className="text-[#d8d8d8] font-semibold">—</span>
                            : `${Number(showCourse.price_promotion).toLocaleString('vi-VN')} VND`
                        }
                    </span>
                </div>
                </div>
                
            </div>

            {/* Description */}
                <div 
                    className="
                        col-span-2 border border-gray-200 rounded-tl-[5px] rounded-tr-[5px] rounded-b-[5px] bg-[#ffffff] overflow-hidden
                        mb-4 
                    "
                >
                    <p className="bg-[#efefef] text-[#000000] px-2 py-3 text-[16px] font-bold">
                        <sup className="text-red-500 font-semibold">*</sup>Mô tả khóa học
                    </p>
                    <div className="space-y-2 text-sm md:text-base px-4 pt-3 pb-[5px]" >
                        <textarea
                            disabled
                            rows="6"
                            defaultValue={showCourse.description}
                            className="w-full border p-2 border-gray-200 rounded bg-[#F5F5F5]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxShowCourseInfo;