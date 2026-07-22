import { useMemo, useState } from "react";
import { Table, Space, Tag, Popconfirm, message, Image, Button } from "antd";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
// import BoxAddCourse from "./BoxAddCourse";
// import BoxEditCourse from "./BoxEditCourse";

// const courses = [
//   {
//     _id: "1",
//     course_title: "Phân tích Dữ Liệu Bằng SQL Trong 8 Giờ",
//     category_name: "Lập trình",
//     provider_name: "Nguyễn Văn A",
//     price: 2209000,
//     price_promotion: 0,
//     students: 700,
//     duration: "8h35'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/5534420_9a20_5.jpg",
//     video_url: "https://www.youtube.com/embed/CkreAh5KOx0",
//     description: "Khóa học SQL từ cơ bản đến nâng cao",
//     create_At: "2024-06-15",
//     update_At: "2024-06-15",
//   },
//   {
//     _id: "2",
//     course_title: "ReactJS Từ Cơ Bản Đến Nâng Cao",
//     category_name: "Frontend",
//     provider_name: "Trần Văn B",
//     price: 1990000,
//     price_promotion: 1490000,
//     students: 1200,
//     duration: "10h20'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/756150_c033_2.jpg",
//     video_url: "https://www.youtube.com/embed/dGcsHMXbSOA",
//     description: "Học ReactJS full từ A-Z",
//     create_At: "2024-06-16",
//     update_At: "2024-06-16",
//   },
//   {
//     _id: "3",
//     course_title: "NodeJS Backend API Thực Chiến",
//     category_name: "Backend",
//     provider_name: "Lê Văn C",
//     price: 1800000,
//     price_promotion: 0,
//     students: 850,
//     duration: "9h15'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/851712_fc61_6.jpg",
//     video_url: "https://www.youtube.com/embed/Oe421EPjeBE",
//     description: "Xây dựng RESTful API với NodeJS",
//     create_At: "2024-06-17",
//     update_At: "2024-06-17",
//   },
//   {
//     _id: "4",
//     course_title: "NextJS 14 Fullstack",
//     category_name: "Fullstack",
//     provider_name: "Phạm Văn D",
//     price: 2500000,
//     price_promotion: 1990000,
//     students: 650,
//     duration: "11h00'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/2776760_f176_10.jpg",
//     video_url: "https://www.youtube.com/embed/1WmNXEVia8I",
//     description: "Fullstack app với NextJS",
//     create_At: "2024-06-18",
//     update_At: "2024-06-18",
//   },
//   {
//     _id: "5",
//     course_title: "HTML CSS Cho Người Mới",
//     category_name: "Frontend",
//     provider_name: "Hoàng Văn E",
//     price: 990000,
//     price_promotion: 690000,
//     students: 2000,
//     duration: "6h30'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
//     video_url: "https://www.youtube.com/embed/mU6anWqZJcc",
//     description: "Nền tảng web cơ bản",
//     create_At: "2024-06-19",
//     update_At: "2024-06-19",
//   },
//   {
//     _id: "6",
//     course_title: "Java Spring Boot API",
//     category_name: "Backend",
//     provider_name: "Đỗ Văn F",
//     price: 2300000,
//     price_promotion: 0,
//     students: 400,
//     duration: "12h10'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/947098_02ec_3.jpg",
//     video_url: "https://www.youtube.com/embed/vtPkZShrvXQ",
//     description: "Backend Java chuyên nghiệp",
//     create_At: "2024-06-20",
//     update_At: "2024-06-20",
//   },
//   {
//     _id: "7",
//     course_title: "UI/UX Design Figma",
//     category_name: "Design",
//     provider_name: "Ngô Văn G",
//     price: 1500000,
//     price_promotion: 1200000,
//     students: 900,
//     duration: "7h45'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/1561458_7f3b_2.jpg",
//     video_url: "https://www.youtube.com/embed/FTFaQWZBqQ8",
//     description: "Thiết kế UI/UX chuyên nghiệp",
//     create_At: "2024-06-21",
//     update_At: "2024-06-21",
//   },
//   {
//     _id: "8",
//     course_title: "Python Cho Data Science",
//     category_name: "Data",
//     provider_name: "Phan Văn H",
//     price: 2100000,
//     price_promotion: 1790000,
//     students: 1100,
//     duration: "13h00'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
//     video_url: "https://www.youtube.com/embed/rfscVS0vtbw",
//     description: "Python phân tích dữ liệu",
//     create_At: "2024-06-22",
//     update_At: "2024-06-22",
//   },
//   {
//     _id: "9",
//     course_title: "Machine Learning Cơ Bản",
//     category_name: "AI",
//     provider_name: "Trương Văn I",
//     price: 2600000,
//     price_promotion: 0,
//     students: 500,
//     duration: "14h20'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg",
//     video_url: "https://www.youtube.com/embed/GwIo3gDZCVQ",
//     description: "ML từ cơ bản đến nâng cao",
//     create_At: "2024-06-23",
//     update_At: "2024-06-23",
//   },
//   {
//     _id: "10",
//     course_title: "DevOps CI/CD Thực Chiến",
//     category_name: "DevOps",
//     provider_name: "Võ Văn K",
//     price: 2400000,
//     price_promotion: 1990000,
//     students: 300,
//     duration: "9h50'",
//     image_url: "https://img-c.udemycdn.com/course/240x135/1111111_devops.jpg",
//     video_url: "https://www.youtube.com/embed/0yWAtQ6wYNM",
//     description: "CI/CD pipeline thực tế",
//     create_At: "2024-06-24",
//     update_At: "2024-06-24",
//   },
// ];
import { Link } from "react-router-dom";
import BoxAddinfoCourse from "./BoxAddinfoCourse/BoxAddinfoCourse";
import useFetchCourse from "../../../../hooks/useCourse/useFetchCourse";
import useLoading from "../../../../hooks/useLoading";
import useAuth from "../../../../hooks/useAuth";

const BoxShowCourse = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");

  const { data: showCourses, isFetching, refetch } = useFetchCourse(page, pageSize, keyword);
  const [clicked, setClicked] = useState(false);
  const loading = useLoading(isFetching, 300);
  const {user} = useAuth();


  const columns = [
    {
      title: "Mã",
      dataIndex: "_id",
      key: "_id",
      width: 200,
      render: (v) => <span className="text-[12px] text-[#000000] font-semibold">#{v}</span>,
    },
    {
      title: "Ảnh",
      dataIndex: "image_url",
      render: (img) => (
        <img
          src={img}
          alt="Course"
          className="w-full h-auto object-cover rounded-md" 
        />
      ),
    },
    {
      title: "Tên khóa học",
      dataIndex: "course_title",
      ellipsis: true,
      render: (text) => <p className="font-semibold line-clamp-1">{text}</p>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (text) => <Tag color="pink">{text}</Tag>,
    },
    {
      title: "Giảng viên",
      dataIndex: "provider",
      key: "provider",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (_, record) => {
        const price = record.price?.toLocaleString("vi-VN") + "đ";
        const promo =
          record.price_promotion > 0
            ? record.price_promotion.toLocaleString("vi-VN") + "đ"
            : null;

        return promo ? (
          <div>
            <span className="text-red-500 font-semibold">{promo}</span>
            <br />
            <span className="line-through text-gray-400 text-sm">
              {price}
            </span>
          </div>
        ) : (
          <span>{price}</span>
        );
      },
    },
    {
      title: "Học viên",
      dataIndex: "students",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space> 
          <Popconfirm
            title="Bạn chắc chắn muốn xóa khóa học?"
            onConfirm={() => handleDelete(record._id)}
          >
            <button
              className="
                bg-red-500 text-white px-3 py-1 rounded-[5px] transition duration-300 ease-in-out 
                hover:scale-95 hover:opacity-65 cursor-pointer
              "
            >
              <DeleteOutlined /> Xóa
            </button>
          </Popconfirm>
        </Space>
      ),
    },
      {
      title: "Chi tiết",
      render: (_, record) => (
        <Space>
          <Link 
            to={`${record._id}`}
            
          >
            <button
              className="
                bg-green-500 text-white px-3 py-1 rounded-[5px] transition duration-300 ease-in-out 
                hover:scale-95 hover:opacity-65 cursor-pointer
              "
            >
              <EyeOutlined /> Xem
            </button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[18px] font-semibold">
       
        </h1>
        <div
          className="flex items-center gap-3"
        >
          <button
            onClick={() => refetch()}
            className="
              border border-dashed border-[#c8c8c8] text-[#000000] px-3 py-2 rounded-[5px] transition duration-300 ease-in-out 
              hover:scale-95 hover:opacity-65 cursor-pointer
            "
          >
            <ReloadOutlined /> Làm mới
          </button>
          <BoxAddinfoCourse />
        </div>
      </div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={showCourses?.data || []}
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total: showCourses?.totalCourses || 0,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
          onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
          },
          showTotal: (t) => `Tổng: ${t}`,
        }}
      />
    </div>
  );
};

export default BoxShowCourse;