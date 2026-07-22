
import React, { useState } from "react";
import { Tabs, Card } from "antd";
import { Link, useParams } from "react-router";
import ChevronLeftIcon from "../../../../components/icons/ChevronLeftIcon.jsx";
import EditCourseIcon from "../../../../components/icons/EditCourseIcon.jsx";
import BoxShowCourseInfo from "./BoxShowCourseInfo/BoxShowCourseInfo.jsx";
import BoxShowCourseRequest from "./BoxShowCourseRequest/BoxShowCourseRequest.jsx";
import BoxShowCourseOverview from "./BoxShowCourseOverview/BoxShowCourseOverview.jsx";
import useFetchCourseDetail from "../../../../hooks/useCourse/useFetchCourseDetail.js";
import BoxShowCourseSection from "./BoxShowCourseSection/BoxShowCourseSection.jsx";


export default function BoxShowDetailCourse() {
    const [activeTab, setActiveTab] = useState("1");
    const { _id: courseId } = useParams();
    const { data: showCourse, isLoading, error , refetch, isFetching} = useFetchCourseDetail(courseId);

    if (isLoading) return <>Loading...</>;
    if (error) return <>Error: {error.message}</>;
    if (!showCourse) return null;

    const items = [
        {
            key: "1",
            label: "Thông Tin Khóa Học",
            children: (
                <BoxShowCourseInfo 
                    courseId={courseId}
                    showCourse={showCourse?.course}
                    refetch={refetch}
                    isFetching={isFetching}
                    isLoading={isLoading}
                />
            ),
        },
        {
            key: "2",
            label: "Nội dung bài học",
            children: <BoxShowCourseSection 
                        courseId={courseId} 
                        showCoure={showCourse?.sections} 
                        refetch={refetch} 
                        isFetching={isFetching} 
                        isLoading={isLoading} 
                    />,
        },
        {
            key: "3",
            label: "Tổng Quan",
            children: 
                <BoxShowCourseOverview 
                    courseId={courseId}
                    showCourse={showCourse?.overviews}
                    refetch={refetch}
                />
            ,
        },
        {
            key: "4",
            label: "Yêu cầu",
            children: 
                <BoxShowCourseRequest 
                    courseId={courseId}
                    showCourse={showCourse?.requests}
                    refetch={refetch}
                /> 
            ,
        }
    
    ];
    return (
        <div className="h-auto bg-gray-100 py-4 px-4 rounded-[5px]">
            <div className=" mx-auto">
                <div className="flex items-center gap-3 mb-2">
                    <Link to="/admin/course" className="text-blue-500 hover:underline text-sm mb-2 inline-block">
                        <button 
                            type="button" 
                            className="
                                flex items-center gap-1
                                bg-gray-200 text-gray-700 p-1 rounded-full transition duration-300 ease-in-out
                                hover:scale-95 hover:opacity-65 cursor-pointer
                            "
                        >
                            <ChevronLeftIcon size={30} />
                        </button>
                    </Link>
                    <h1 className="text-xl md:text-2xl font-semibold mb-4">
                        {showCourse?.course?.course_title}
                    </h1>
                </div>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={items}
                    style={{paddingLeft:"20px", paddingRight:"20px"}}
                    className=" custom-tabs bg-white p-4 rounded-lg shadow"
                />
            </div>
        </div>
    );
}