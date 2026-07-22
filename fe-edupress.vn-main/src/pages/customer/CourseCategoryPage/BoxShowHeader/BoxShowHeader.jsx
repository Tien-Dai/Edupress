
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { Search } = Input;

const BoxShowHeader = ({searchKeyword, handleSearch}) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 my-6">
            <h1 className="text-lg md:text-xl font-semibold">
                All khóa học <span className="text-orange-500">Phát triển web</span>
            </h1>

            <div className="flex items-center gap-4">
                <Search
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchKeyword}
                    placeholder="Tìm kiếm..."
                    className="w-[200px] md:w-[300px]"
                />
                <AppstoreOutlined className="text-lg cursor-pointer" />
                <BarsOutlined className="text-lg cursor-pointer" />
            </div>
        </div>
    )
}

export default BoxShowHeader