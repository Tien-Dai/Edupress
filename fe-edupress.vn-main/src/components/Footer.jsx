

import { Link } from "react-router-dom";
import FaceBookIcon from "./icons/FaceBookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import PinterestIcon from "./icons/PinterestIcon";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="showFooter bg-[#F5F5F5] mt-[30px]">      
            <div>
                <div 
                className="
                    lg:max-w-[1080px] mx-auto lg:flex justify-between w-full
                    h-auto lg:py-[40px] gap-[150px] px-[20px] lg:px-0
                "
                >
                {/* Logo + description */}
                <div className="lg:w-[30%] mb-[20px] lg:mb-0">
                    <Link to="/" className="flex items-center gap-1 py-[10px] lg:py-0">
                    <img
                        src="/images/logo.png"
                        alt="EduPress Logo"
                        className="w-[30px] h-[20px] md:w-[40px] md:h-[30px]"
                    />
                    <p className="font-bold md:text-[24px] lg:text-[28px]">{t('footer.about.brand')}</p>
                    </Link>
                    <p className="lg:mt-[20px] font-regular text-[10px] md:text-[12px] lg:text-[16px] text-[#555555]">
                        {t('footer.about.description')}
                    </p>
                </div>

                {/* Right content */}
                <div className="lg:w-[70%] md:flex lg:justify-between">

                    {/* Support */}
                    <div className="w-full">
                    <h3 className="text-[#000000] font-semibold text-[12px] md:text-[18px] lg:text-[20px] lg:pt-[5px] mb-[5px] lg:mb-[20px]">
                        {t('footer.support.title')}
                    </h3>
                    <ul className="leading-[25px] md:leading-[30px] lg:leading-[40px]">
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.support.contact')}
                        </Link>
                        </li>
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.support.faq')}
                        </Link>
                        </li>
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.support.policy')}
                        </Link>
                        </li>
                    </ul>
                    </div>

                    {/* Programs */}
                    <div className="w-full">
                    <h3 className="text-[#000000] font-semibold text-[12px] md:text-[18px] lg:text-[20px] pt-[5px] mb-[5px] lg:mb-[20px]">
                        {t('footer.programs.title')}
                    </h3>
                    <ul className="leading-[25px] md:leading-[30px] lg:leading-[40px]">
                        <li>
                        <Link to={`/course-category/69573760d58c9265fe052c10`} className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.programs.web')}
                        </Link>
                        </li>
                        <li>
                        <Link to="/" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.programs.data')}
                        </Link>
                        </li>
                        <li>
                        <Link to="/" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.programs.mobile')}
                        </Link>
                        </li>
                        <li>
                        <Link to="/" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.programs.all')}
                        </Link>
                        </li>
                    </ul>
                    </div>

                    {/* Contact */}
                    <div className="w-full">
                    <h3 className="text-[#000000] font-semibold text-[12px] md:text-[18px] lg:text-[20px] pt-[5px] mb-[5px] lg:mb-[20px]">
                        {t('footer.contact.title')}
                    </h3>
                    <div className="leading-[30px]">
                        <p className="text-[#555555] text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.contact.address')}
                        </p>
                        <p className="text-[#555555] text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.contact.phone')}
                        </p>
                        <p className="text-[#555555] text-[10px] md:text-[12px] lg:text-[16px]">
                            {t('footer.contact.email')}
                        </p>
                    </div>

                    {/* Social icons */}
                    <div className="flex gap-[10px] items-center py-[10px] lg:mt-[20px] translate-x-[-5px]">
                        <FaceBookIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                        <InstagramIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                        <YoutubeIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                        <PinterestIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                        <TwitterIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                    </div>
                    </div>

                </div>
                </div>

                {/* Bottom */}
                <div className="max-w-[1290px] mx-auto">
                <hr className="w-full h-[1px] bg-[#555555] opacity-10" />
                <p className="text-[10px] md:text-[12px] lg:text-[16px] text-[#555555] text-center py-[10px]">
                    {t('footer.copyright')}
                </p>
                </div>
            </div>
        </footer>

    )
}

export default Footer;