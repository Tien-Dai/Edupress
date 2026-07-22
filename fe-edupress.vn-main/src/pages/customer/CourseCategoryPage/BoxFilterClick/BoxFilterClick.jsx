
import { Checkbox, Radio, Divider } from "antd";

const BoxFilterClick = ({sortType, handleSort, handlePriceFilter}) => {
    return (
        <div>
            <h3 className="font-semibold text-base mb-3">
                Loại khóa học
            </h3>

            <Radio.Group 
                onChange={handleSort}
                value={sortType}
                className="flex flex-col gap-2"
            >
                <Radio value="all">Tất cả khóa học</Radio>
                <Radio value="new">Khóa học mới</Radio>
                <Radio value="featured">Khóa học nổi bật</Radio>
            </Radio.Group>

        <Divider className="my-4 bg-[#e4e4e4]" />

        {/* Giá */}
            <h3 className="font-semibold text-base mb-3">
                Giá khóa học
            </h3>

            <Checkbox.Group 
                onChange={handlePriceFilter}
                className="flex flex-col gap-2"
            >
                <Checkbox value="free">Miễn phí</Checkbox>
                <Checkbox value="under500">Dưới 500.000đ</Checkbox>
                <Checkbox value="500to1m">500.000đ - 1.000.000đ</Checkbox>
                <Checkbox value="over1m">Trên 1.000.000đ</Checkbox>
            </Checkbox.Group>
        </div>
    )
}

export default BoxFilterClick;