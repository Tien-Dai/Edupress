import React from "react";
import {
  BookOutlined,
  FileTextOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined
} from "@ant-design/icons";
import { Menu, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ onClose, categories = [], loading }) => {
  const navigate = useNavigate();

  // map key -> route
  const routeMap = {
    home: "/",
    blog: "/blog",
    about: "/about",
    contact: "/contact"
  };

  const items = [
    {
      key: "home",
      label: "Trang chủ",
      icon: <HomeOutlined />
    },
    {
      key: "courses",
      label: "Khóa học",
      icon: <BookOutlined />,
      children: categories.map(cat => ({
        key: `cat-${cat._id}`,
        label: cat.cate_name
      }))
    },
    {
      key: "blog",
      label: "Bài viết",
      icon: <FileTextOutlined />
    },
    {
      key: "about",
      label: "Về EduPress",
      icon: <InfoCircleOutlined />
    },
    {
      key: "contact",
      label: "Liên hệ",
      icon: <MailOutlined />
    }
  ];

  const handleClick = ({ key }) => {
    // click category
    if (key.startsWith("cat-")) {
      const id = key.replace("cat-", "");
      navigate(`/courses/${id}`);
    }

    // click menu thường
    if (routeMap[key]) {
      navigate(routeMap[key]);
    }

    onClose && onClose();
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-10">
          <Spin />
        </div>
      ) : (
        <Menu
          mode="inline"
          items={items}
          defaultOpenKeys={["courses"]}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default MenuItem;
