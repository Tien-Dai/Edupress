import { Avatar, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import KeyIcon from "../../icons/KeyIcon";
import BellIcon from "../../icons/BellIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import { useCartStore } from "../../../stores/cart.store";
import BookOpenIcon from "../../icons/BookOpen";
import HistoryIcon from "../../icons/HistoryIcon";
import {
    HomeFilled,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { use } from "react";

const MenuUser = ({t, user, logout, isAuthenticated, getAvatarLetter, handleChangePassword, handleNotification}) => {
    const nav = useNavigate();
    const { confirm } = Modal;
    const {clearCart} = useCartStore();
    const handleLogout = () => {
        confirm({
            title: "Đăng xuất",
            content: "Bạn có chắc chắn muốn đăng xuất không?",
            okText: "Đăng xuất",
            cancelText: "Hủy",
            onOk() {
                clearCart();
                logout();
                message.success("Bạn đã đăng xuất");
                nav("/");
            }
        });
    };
    
    return(
        <ul
            className={`
            ${isAuthenticated ? 'w-[250px]' : 'w-[150px]'} absolute right-0 top-full mt-3  overflow-hidden bg-white rounded-xl
                border border-[#EAEAEA] shadow-xl opacity-0 invisible translate-y-2 scale-95
                transition-all duration-200 ease-out origin-top group-hover:opacity-100 group-hover:visible
                group-hover:translate-y-0 group-hover:scale-100 z-50
            `}
        >
            {
                isAuthenticated ? (
                    <div>
                       {
                        user.role !== 'admin' ? (
                            <>
                                <div
                                    className="
                                    px-3 py-2 border-b border-b-[#EAEAEA] flex items-center gap-3 
                                    "
                                >
                                    <Avatar 
                                        className='avatar_header' 
                                    >
                                        <span className="text-[#000000] font-semibold">{getAvatarLetter(user?.username)}</span>
                                    </Avatar>
                                    <div className="leading-[20px]">
                                        <p className="text-[#2c2c2c] font-semibold p-0 m-0">{user?.username}</p>
                                        <p className="text-[#a4a4a4] text-[14px] font-regular p-0 m-0">{user?.email}</p>
                                    </div>
                                </div>
                                {user?.role === "provider" && (
                                      <li 
                                    className="menu-item" 
                                >   
                                        <HomeFilled />
                                        <Link to="/">Trang chủ</Link>
                                    </li>
                                )}
                                <li 
                                    className="menu-item" 
                                > 
                                    <BookOpenIcon size={20} />
                                    <Link  to="/my-course">{t('header.mycourse')}</Link> 
                                </li>
                                <li 
                                    className="menu-item" 
                                > 
                                    <KeyIcon size={16} />
                                    <Link to="/change-password">{t('header.changepassword')}</Link> 
                                </li>
                                <li 
                                    className="menu-item" 
                                > 
                                    <div className="flex items-center justify-between gap-2">
                                        <BellIcon size={20} />
                                        <Link to="/notification">{t('header.notification')}</Link> 
                                        <span className="bg-red-500 w-[20px] h-[20px] rounded-full flex items-center justify-center text-white text-[12px]">0</span>
                                    </div>
                                </li>
                                <li 
                                    className="menu-item" 
                                > 
                                    <HistoryIcon size={20} />
                                    <Link to="/checkout-history">{t('header.chechkoutHistory')}</Link> 
                                </li>
                                {user?.role !== "provider" && user?.role === "customer" && (
                                      <li 
                                    className="menu-item" 
                                >   
                                        <VideoCameraOutlined />
                                        <Link to="/register-provider">Trở thành Giảng Viên</Link>
                                    </li>
                                )}

                                {user?.role === "provider" && (
                                      <li 
                                    className="menu-item" 
                                >   
                                        <VideoCameraOutlined />
                                        <Link to="/admin/course">Quản lý khóa học</Link>
                                    </li>
                                )}
                            </>
                        ):(
                            <>  
                                <li 
                                    onClick={handleChangePassword}
                                    className=" 
                                        text-[#000000] px-3 py-2 border-l-2 border-l-[#ffffff] flex
                                        items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out 
                                        hover:border-[#FFAC2D] hover:bg-white hover:text-[#FF782D] 
                                        hover:pl-5 text-[16px] font-semibold whitespace-nowrap overflow-hidden 
                                    " 
                                > 
                                    <KeyIcon size={16} />
                                    {t('header.changepassword')} 
                                </li>
                            </>
                        )
                       }
                        <div className=" border-b border-b-[#EAEAEA]">
                            
                        </div>
                        <li 
                            className=" 
                                text-black px-3 py-2 border-l-2 border-l-[#ffffff] flex 
                                items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out 
                                hover:border-[#FFAC2D] hover:bg-white hover:text-[#FF782D] 
                                hover:pl-5 text-[16px] font-semibold whitespace-nowrap overflow-hidden 
                            " 
                            onClick={handleLogout}
                        > 
                            <LogoutIcon size={24} />
                            {t('header.logout')} 
                        </li>
                    </div>
                ) : (
                    <>
                        <li
                            className="
                                px-3 py-2 border-l-2 border-l-[#ffffff]
                                cursor-pointer transition-all duration-300 ease-in-out 
                                hover:border-[#FFAC2D] hover:bg-white 
                                hover:pl-6 text-[16px] font-semibold whitespace-nowrap overflow-hidden
                            "
                            >
                            <Link 
                                to="/login"
                                className="text-black transition-all duration-300 ease-in-out hover:text-[#FF782D]"
                            >
                                {t('header.login')}
                            </Link>
                        </li>
                        <li 
                            className=" 
                                text-black px-3 py-2 border-l-2 border-l-[#ffffff] 
                                cursor-pointer transition-all duration-300 ease-in-out 
                                hover:border-[#FFAC2D] hover:bg-white hover:text-[#FF782D] 
                                hover:pl-6 text-[16px] font-semibold whitespace-nowrap overflow-hidden 
                            " 
                        > 
                            <Link to="/register">{t('header.register')}</Link> 
                        </li>
                    </>
                )
            }
        </ul>
    )
}

export default MenuUser;