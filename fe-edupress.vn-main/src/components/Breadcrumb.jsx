
import ChevronRightIcon  from "../components/icons/ChevronRightIcon";


const Breadcrumb = ({nameCate, showList, showNameCategory}) => {
    return (
        <div className="bg-[#F5F5F5] w-full h-auto">
            <div className="max-w-[1080px] mx-auto py-[5px] md:py-[10px] lg:py-[15px] relative px-[15px] lg:px-0">
                <nav className="flex" aria-label="Breadcrumb">
                    <ul className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <div className="flex items-center space-x-1.5">
                                <span className="
                                    currentCate 
                                    inline-flex items-center 
                                    font-medium text-[#adadad]
                                    text-[10px] md:text-[12px] lg:text-[14px]
                                ">
                                    {nameCate}
                                </span>
                            </div>
                        </li>

                        <li aria-current="page">
                            <div className="flex items-center space-x-1.5">
                                <ChevronRightIcon size={16} className="md:size-[18px] lg:size-[20px]" />
                                {showList &&  (
                                    <span className="
                                        font-medium
                                        text-[8px] md:text-[12px] lg:text-[14px]
                                    ">
                                        {showList.course_title || showNameCategory}
                                    </span>
                                )}
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    );
}

export default Breadcrumb;