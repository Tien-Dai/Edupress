

const BoxDescriptions = ({showList}) => {
    return (
        <div className=" bg-[#F5F5F5] rounded-b-[15px] lg:px-4 ">
            {
                showList && (
                    <div className="border border-gray-300 px-[10px] py-[10px] rounded-[5px]">
                        <h2 className="text-[#000000] text-[14px] md:text-[16px] lg:text-[18px] font-bold mb-[10px]">Mô tả khóa học</h2>
                        <p className=" text-[12px] md:text-[14px] lg:text-[16px] text-[#000000] font-sans text-justify">{showList.description}</p>
                    </div>
                )
            }                             
        </div>
    )
}

export default BoxDescriptions;