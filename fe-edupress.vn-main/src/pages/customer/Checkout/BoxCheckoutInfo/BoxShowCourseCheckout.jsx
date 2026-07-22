import { Link } from "react-router-dom";



const BoxShowCoursesCheckout = ({item}) => {
    return (
        <div key={item.course_id} className="flex items-center gap-3 ">
          <img
            src={item.image_url}
            alt={item.course_title}
            className="w-[60px] h-[60px] rounded-lg object-cover"
          />

          <div className="flex-1">
            <h3
              className="text-[12px] md:text-[14px] lg:text-[16px] font-semibold line-clamp-2 text-black"
            >
              {item.course_title}
            </h3>

            <div className="flex items-center justify-between mt-1">
              <p className="text-[12px] text-gray-400">
                {item.total_lectures} bài giảng
              </p>

              <span className="text-[14px] font-semibold">
                {item.price === 0
                  ? <span className="text-green-500">Free</span>
                  : `${Number(item.price).toLocaleString("vi-VN")} VND`}
              </span>
            </div>
          </div>
        </div>
    )
}

export default BoxShowCoursesCheckout;