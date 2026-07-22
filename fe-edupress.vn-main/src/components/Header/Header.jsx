
'use client';

import BagShoppingIcon from "../icons/BagShoppingIcon";
import BellIcon from "../icons/BellIcon";
import ChevronDown from "../icons/ChevronDown";
import UserIcon from "../icons/UserIcon";
import useFetchData from "../../api/useFetchData";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import MenuMoblie from "./HeaderMobile/MenuMoblie/MenuMoblie";
import SearchDropdown from "./BoxSearch/SearchDropdown";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../LanguageSelect";
import BoxSearchMoblie from "./HeaderMobile/BoxSearchMobile";
import useAuth from "../../hooks/useAuth";
import { Avatar } from "antd";
import MenuUser from "./BoxMenu/MenuUser";
import BoxShowMenuCate from "./BoxMenu/BoxShowMenuCate";
import { useCartStore } from "../../stores/cart.store";
import BoxShowCart from "./BoxShowCart/BoxShowCart";




const Header = () => {

    
    const { t } = useTranslation();
    const {data: categories, loading} = useFetchData('categories');
    const {data: courses, loading: loadingCourse } = useFetchData('courses');
    const {user, logout, isAuthenticated, getAvatarLetter} = useAuth();
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);
    const {cart , loading: cartLoading, fetchCart, hasFetchedCart } = useCartStore();
    useEffect(() => {    
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScrollY.current) {
                // Scrolling down
                setShow(false);
            } else {
                // Scrolling up
                setShow(true);
            }
            lastScrollY.current = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Search 
    const [keyword, setKeyword] = useState("");
    const results = useMemo(() => {
        // Chưa nhập gì → hiện khóa học nổi bật
            if (!keyword.trim()) {
                return courses?.filter(item => item.feature === true);
            }

            const key = keyword.toLowerCase();
            return courses?.filter(item =>
                item.course_title.toLowerCase().includes(key)
            );
    }, [courses, keyword]);

    useEffect(() => {
        fetchCart(user?._id);
    }, [ user?._id ]);


    const courseCount = cart?.courses?.length ?? 0;

    // console.log("user", user.username);

    return (
        <header 
            className={
                `
                    top-0 fixed w-full transition-transform ease-in-out duration-300 shadow-md
                    z-1000 ${show ? 'translate-y-0' : '-translate-y-full'} bg-[#c2c2c2]

                `
            }
        >
            <div className="bg-[#ffffff] flex items-center shadow-md ">
                <div 
                    className="
                        lg:max-w-[1080px] mx-auto flex items-center justify-between  w-full h-full 
                        px-[15px] lg:px-0
                    "
                >   
                    {/* Button Mobile */}
                        <div className=" lg:hidden">
                            <MenuMoblie
                                t={t}
                                user={user}
                                logout={logout}
                                isAuthenticated={isAuthenticated}
                                getAvatarLetter={getAvatarLetter}
                                categories={categories}
                                loading={loading}
                            />
                        </div>
                    {/* <!-- Logo --> */}
                        <Link to="/" className="md:leading-[20px] w-full flex md:w-auto md:flex-col justify-center items-center">
                            <div className="flex items-center gap-1 ">
                                <img src="/images/logo.png" alt="EduPress Logo" className="w-[30px] h-[20px] md:w-[40px] md:h-[30px]" />
                                <p 
                                    className=" 
                                        font-bold md:text-[24px] lg:text-[28px]
                                    "
                                >   
                                    EduPress
                                </p>
                            </div>
                            <div className="hidden md:flex justify-center items-center translate-y-[3px]"><div className="w-[60px] h-1px bg-[#EAEAEA] border-0"></div></div>
                            <p className="hidden lg:block text-[12px] font-semibold text-center">{t('header.slogan')}</p>
                        </Link>
                    {/* <!-- Menu --> */}
                        <nav className="hidden lg:block">
                            <ul className="flex items-center overflow-visible">
                                <li className="h-[64px] px-[20px] flex items-center">
                                    <Link to="/" className="nav-link text-[16px] font-semibold">
                                        {t('header.nav1')}
                                    </Link>
                                </li>

                                <li className="relative group cursor-pointer h-[64px] px-[20px] flex items-center">
                                    <Link
                                        to="/"
                                        className="nav-link flex items-center gap-2 text-[16px] font-semibold"
                                    >
                                        <span>{t('header.nav2')}</span>
                                        <ChevronDown
                                            size={20}
                                            className="transition-transform duration-300 group-hover:rotate-180"
                                        />
                                    </Link>

                                    {/* Spacer giữ hover */}
                                    <div className="absolute left-0 top-full h-3 w-[300px]"></div>

                                    {/* Submenu */}
                                        <BoxShowMenuCate 
                                            categories={categories}
                                            loading={loading}
                                        />
                                </li>


                                <li className="h-[64px] px-[20px] flex items-center">
                                    <Link to="/blog" className="nav-link text-[16px] font-semibold">
                                        {t('header.nav3')}
                                    </Link>
                                </li>

                                <li className="h-[64px] px-[20px] flex items-center">
                                    <Link to="/about" className="nav-link text-[16px] font-semibold">
                                        {t('header.nav4')}
                                    </Link>
                                </li>

                                <li className="h-[64px] px-[20px] flex items-center">
                                    <Link to="/contact" className="nav-link text-[16px] font-semibold">
                                        {t('header.nav5')}
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        
                        <div className="flex items-center gap-[10px]">
                            <ul className="flex items-center leading-[30px]">

                                <div 
                                    className="hidden lg:block"
                                >
                                    <SearchDropdown 
                                        loading={loadingCourse}
                                        setKeyword={setKeyword}
                                        keyword={keyword}
                                        results={results}
                                    />
                                </div>
                                <div className="block lg:hidden">
                                    <BoxSearchMoblie 
                                        loading={loadingCourse}
                                        setKeyword={setKeyword}
                                        keyword={keyword}
                                        results={results}
                                    />
                                </div>

                                {/* Cart */}
                                    <li className="relative group">
                                    {/* Icon */}
                                        <Link
                                            to="/cart"
                                        >
                                            <div
                                                className="
                                                relative flex items-center justify-center
                                                h-[64px] w-[48px]
                                                cursor-pointer
                                                transition-colors duration-200
                                                group-hover:bg-[#F5F5F5] group-hover:text-[#FF782D]
                                                rounded-md
                                                "
                                            >
                                                <BagShoppingIcon size={24} />

                                                {/* Badge */}
                                                <span
                                                    className="
                                                        absolute top-[14px] right-[8px]
                                                        w-[16px] h-[16px]
                                                        text-[10px] text-white
                                                        bg-red-500 rounded-full
                                                        flex items-center justify-center
                                                    "
                                                >
                                                 { courseCount ? courseCount : 0 }
                                                </span>
                                            </div>
                                        </Link>

                                        {/* Spacer giữ hover */}
                                        <div className="absolute top-full right-0 h-3 w-full"></div>

                                        {/* Box show cart */}
                                            <BoxShowCart 
                                                cart={cart} 
                                                loadingCourse={loadingCourse}
                                                cartLoading={cartLoading}
                                            />
                                    </li>

                                {/* User */}
                                    <li className="relative group hidden lg:block">
                             
                                        <div
                                            className="
                                            flex items-center justify-center
                                            h-[64px] w-[48px]
                                            cursor-pointer
                                            transition-colors duration-200
                                            group-hover:bg-[#F5F5F5] group-hover:text-[#FF782D]
                                            rounded-md
                                            "
                                        >
                                            {
                                                isAuthenticated ?
                                                    <Avatar 
                                                        className='avatar_header' 
                                                    >
                                                        <span className="text-[#000000] font-semibold">{getAvatarLetter(user.username)}</span>
                                                    </Avatar>
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
                                            />
                                    </li>

                                {/* Language */}
                                    <li
                                        className="
                                            hidden lg:flex items-center justify-center
                                            h-[64px] w-[48px]
                                            cursor-pointer
                                            transition-colors duration-200
                                            hover:bg-[#F5F5F5]
                                            rounded-md
                                        "
                                    >
                                        <LanguageSelect />
                                    </li>

                            </ul>
                        </div>

                
                </div>
            </div>
        </header>
    )
}

export default Header;