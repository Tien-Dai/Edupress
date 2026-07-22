import React, { use, useState } from 'react';
import {
  BellOutlined,
  CheckOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { Outlet, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import MenuUser from '../components/Header/BoxMenu/MenuUser';
import UserIcon from '../components/icons/UserIcon';
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const nav = useNavigate();
  const { isAuthenticated, user, logout, getAvatarLetter } = useAuth();
  const { t } = useTranslation();

   const handleChangePassword = () => {
    nav("change-password");
  };
  const handleNotification = () => {
    nav("notification");
  }
  const { pathname } = useLocation();

  const getTitle = () => {
    if (pathname === "/admin") return "Trang chủ";
    if (pathname.startsWith("/admin/course-all")) return "Quản lý khóa học";
    if (pathname.startsWith("/admin/employee")) return "Quản lý tài khoản";
    if (pathname.startsWith("/admin/course")) return "Quản lý khóa học";
    if (pathname.startsWith("/admin/notification")) return "Quản lý thông báo";
    if (pathname.startsWith("/admin/providers/pending")) return "Đăng ký Provider";
    return "";
  };
  
  const getSelectedKey = () => {
    if (pathname.startsWith("/admin/course-all")) return "course-all";
    if (pathname.startsWith("/admin/course")) return "course";
    if (pathname.startsWith("/admin/employee")) return "employee";
    if (pathname.startsWith("/admin/notification")) return "notification";
    if (pathname.startsWith("/admin/providers/pending")) return "providerpending";
    return "";
  };

  const role = user?.role;

  const menuItems = [
    ...(role === "admin"
      ? [
          {
            key: "employee",
            icon: <UserOutlined style={{ fontSize: 20 }} />,
            label: "Quản lý tài khoản",
            onClick: () => nav("employee"),
          },
          {
            key: "providerpending",
            icon: <BellOutlined style={{ fontSize: 20 }} />,
            label: "Đăng ký Provider",
            onClick: () => nav("providers/pending"),
          }
        ]
      : []),

    ...(role === "provider" 
      ? [
          {
            key: "course",
            icon: <VideoCameraOutlined style={{ fontSize: 20 }} />,
            label: "Quản lý khóa học",
            onClick: () => nav("course"),
          },
        ]
      : []),
  ];

  return (
    <Layout style={{ minHeight: '100vh',  }}>
      <Sider width={260} trigger={null} collapsible collapsed={collapsed} style={{padding:"15px"}}>
        <h1 className='text-[#ffffff] text-center py-[20px] text-[20px] font-bold' >
          {role === "admin" ? "Admin" : "Nhà cung cấp"}
        </h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className='
            admin-menu 
          '
          selectedKeys={[getSelectedKey()]}
          items={menuItems}

        />
      </Sider>
      <Layout>
        <div
          className='
           bg-[#ffffff] flex justify-between items-center 
           pr-[20px] shadow-md
          '
        > 
         <div className='flex items-center gap-1'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div>
              <p className='text-[#2c2c2c] text-[18px] font-semibold p-0 m-0' >
                {getTitle()}
              </p>
            </div>
         </div>
          <div>
            {/* User */}
              <div className="relative group hidden lg:block">
           
                  <div
                      className="
                          flex items-center gap-2 p-2
                      "
                  >
                      {
                          isAuthenticated ?
                              <div className="flex items-center gap-2 group ">
                                <Avatar 
                                    className='avatar_header' 
                                >
                                    <span className="text-[#000000] font-semibold">{getAvatarLetter(user.username)}</span>
                                </Avatar>
                                <div className="leading-[20px]">
                                  <p className="text-[#2c2c2c] font-semibold p-0 m-0">{user.username}</p>
                                  <p className="text-[#a4a4a4] text-[14px] font-regular p-0 m-0">{user.email}</p>
                                </div>
                                <div className='transition-transform duration-300 group-hover:rotate-180'>
                                  <DownOutlined />
                                </div>
                              </div>
                          :
                          <UserIcon size={24} />
                      }
                  </div>
                  {/* Spacer */}
                  <div className="absolute top-full right-0 h-3 w-full"></div>
                  {/* Menu User */}
                      <MenuUser 
                          t={t}
                          user={user}
                          logout={logout}
                          isAuthenticated={isAuthenticated}
                          getAvatarLetter={getAvatarLetter}
                          handleChangePassword={handleChangePassword}
                          handleNotification={handleNotification}
                      />
              </div>
          </div>
        </div>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;