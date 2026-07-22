

import { useState } from "react";
import BoxOverview from "./BoxOverview";
import BoxInstructions from "./BoxInstructions/BoxInstructions";
import BoxDescriptions from "./BoxDescriptions";
import BoxRequests from "./BoxRequests"

const tabs = [
  { key: "overview", label: "Tổng quan" },
  { key: "instructions", label: "Nội dung" },
  { key: "description", label: "Mô tả" },
  { key: "request", label: "Yêu cầu" },
];

export default function BoxShowTabsCourse({showList, loading}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="rounded-[15px] overflow-hidden border border-gray-300">
      {/* TAB HEADER */}
      <ul className="flex bg-white">
        {tabs.map((tab, index) => (
          <li key={tab.key} className="w-full">
            <button
              onClick={() => setActiveTab(tab.key)}
              className={`
                w-full py-3 text-[14px] md:text-[16px] lg::text-[18px] font-semibold border-r last:border-r-0
                transition cursor-pointer
                ${
                  activeTab === tab.key
                    ? "text-[#FF782D] bg-[#F5F5F5] boredr-[#FF782D] border-b-[1px]"
                    : "hover:bg-[#F5F5F5]"
                }
              `}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* TAB CONTENT */}
      <div className="bg-[#F5F5F5] px-4 py-[20px]">
        {activeTab === "overview" && <BoxOverview showList={showList} loading={loading}/>}
        {activeTab === "instructions" && <BoxInstructions showList={showList}/>}
        {activeTab === "description" && <BoxDescriptions showList={showList} />}
        {activeTab === "request" && <BoxRequests showList={showList} />}
      </div>
    </div>
  );
}
