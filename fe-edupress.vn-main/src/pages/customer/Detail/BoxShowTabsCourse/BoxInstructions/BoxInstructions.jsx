import { Collapse } from "antd";
import { CaretDownOutlined, ClockCircleOutlined } from "@ant-design/icons";
import BoxLesson from "./BoxLesson";

export default function BoxInstructions({ showList, onSelectLecture }) {
    const course = showList;

    if (!course || !course.sections) {
        return null;
    }

    const items = course.sections.map((section) => ({
        key: section._id,
        label: (
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-2 text-[10px] md:text-[12px] lg:text-[14px]">
                    <span className="font-semibold text-white">
                        {section.chapter_title}
                    </span>

                    <div className="flex items-center gap-4 text-white text-[10px]">
                        <span>{section.lecture_count} bài giảng</span>
                        <span>{section.duration}</span>
                    </div>
                </div>

                <div className="text-white">
                    <ClockCircleOutlined />
                </div>
            </div>
        ),

        children: (
            <div className="flex flex-col gap-2">
                {section.lectures?.map((lecture) => (
                    <BoxLesson
                        key={lecture._id}
                        title={lecture.title}
                        time={lecture.duration}
                        preview={lecture.preview}
                        onClick={() =>
                            onSelectLecture?.(
                                lecture.vid_lectures_url || course.course?.video_url || course.video_url
                            )
                        }
                    />
                ))}
            </div>
        ),

        className: "bg-[#1f2937]",
    }));

    return (
        <Collapse
            accordion
            items={items}
            expandIconPlacement="start"
            defaultActiveKey={items.length ? [items[0].key] : []}
            expandIcon={({ isActive }) => (
                <CaretDownOutlined
                    style={{ color: "#ffffff" }}
                    rotate={isActive ? 180 : 0}
                />
            )}
        />
    );
}