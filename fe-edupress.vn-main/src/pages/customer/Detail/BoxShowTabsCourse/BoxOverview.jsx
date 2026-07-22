import { Spin } from "antd";
import TickIcon from "../../../../components/icons/TickIcon";

const BoxOverview = ({ showList, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse w-full h-[300px] bg-[#d8d8d8] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      id="overview"
      className="tab-content bg-[#F5F5F5] rounded-b-[15px] p-1 sm:p-3 md:p-4"
    >
      <div className="border border-gray-300 p-3 sm:p-4 rounded-md">
        <h2 className="text-[#000000] text-[14px] md:text-[16px] lg:text-[18px] font-bold mb-3">
          Nội dung bài học
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {showList?.overviews?.map((item) => (
            <div
              key={item._id}
              className="flex items-start gap-2"
            >
              <TickIcon
                size={18}
                className="text-[#bebebe] mt-[2px] shrink-0"
              />

              <span className="text-[12px] md:text-[14px] lg:text-[16px] text-[#000000] font-sans text-justify leading-relaxed">
                {item.overview_name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoxOverview;