


const TitleHome = ({title, description}) => {
    return (
        <div className="flex flex-col leading-[20px] border-l-4 border-[#FF782D] pl-4">
            <h2 className="text-[16px] lg:text-[22px] font-semibold text-[#000000]">{title}</h2>
            <p className="text-[10px] lg:text-[12px] font-regular text-[#555555]">{description}</p>
        </div>
    )
}

export default TitleHome;