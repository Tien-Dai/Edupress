import React, { useState } from "react";
import { Tabs, Card } from "antd";


const { TabPane } = Tabs;

const course = {
  title: "Phân tích Dữ Liệu Bằng SQL Trong 8 Giờ",
  category_id: "69e1965f1e4d84c00e51c014",
  provider_id: "69e1a960c87dee8a44fd30d7",
  price: "209.000đ",
  students: 700,
  duration: "8h35'",
  image: "https://img-c.udemycdn.com/course/240x135/5534420_9a20_5.jpg",
  video: "https://www.youtube.com/embed/CkreAh5KOx0",
};

export default function CourseDetail() {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-semibold mb-4">
          {course.title}
        </h1>

        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          className="bg-white p-2 rounded-lg shadow"
        >
          <TabPane tab="Thông Tin Khóa Học" key="1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left video */}
              <Card>
                <div className="aspect-video w-full">
                  <iframe
                    src={course.video}
                    title="video"
                    className="w-full h-full rounded"
                    allowFullScreen
                  />
                </div>
              </Card>

              {/* Right info */}
              <Card title="Thông Tin Khóa Học">
                <div className="space-y-2 text-sm md:text-base">
                  <p>
                    <strong>Category ID:</strong> {course.category_id}
                  </p>
                  <p>
                    <strong>Provider ID:</strong> {course.provider_id}
                  </p>
                  <p>
                    <strong>Giá:</strong> {course.price}
                  </p>
                  <p>
                    <strong>Số học viên:</strong> {course.students}
                  </p>
                  <p>
                    <strong>Thời lượng:</strong> {course.duration}
                  </p>
                  <p className="break-all">
                    <strong>Image URL:</strong> {course.image}
                  </p>
                  <p className="break-all">
                    <strong>Video URL:</strong> {course.video}
                  </p>
                </div>
              </Card>
            </div>
          </TabPane>

          <TabPane tab="Requests" key="2">
            <div className="p-4">Nội dung Requests...</div>
          </TabPane>

          <TabPane tab="Overview" key="3">
            <div className="p-4">Nội dung Overview...</div>
          </TabPane>

          <TabPane tab="Sections" key="4">
            <div className="p-4">Nội dung Sections...</div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
