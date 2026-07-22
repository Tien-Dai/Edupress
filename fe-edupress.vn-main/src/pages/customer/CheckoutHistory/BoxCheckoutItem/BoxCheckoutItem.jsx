
const BoxCheckoutItem = ({ item, user }) => {

  return (
    <div className="rounded-xl border border-[#cccccc] bg-white p-4 space-y-4">
        
        {/* ===== Header ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm text-gray-600">
                <p className="text-[10px] md:text-[12px] lg:text-[14px] font-semibold ">
                   <strong>#Mã đơn:</strong> <span className="font-mono">{item._id}</span>
                </p>

                <hr className="border-[#555555] border-dashed  lg:border-[1px] w-full mb-2" />

                <p>
                    <span className="font-medium text-gray-800 text-[10px] md:text-[12px] lg:text-[14px]">Học viên:</span>{" "}
                    {item.user_id === user?._id && user?.username}
                </p>
                <p className="text-[10px] md:text-[12px] lg:text-[14px] font-medium">
                    Ngày mua: <span className="font-normal">{new Date(item.created_at).toLocaleDateString("vi-VN")}</span>
                </p>
            </div>

            <div className="flex items-center gap-2">
                <span
                    className={`
                        text-[10px] md:text-[12px] lg:text-[14px] px-3 py-1 rounded-[5px] font-medium 
                        ${item.status === "paid" && "bg-[#29da0e] text-white"}
                        ${item.status === "pending" && "bg-yellow-400 text-white"}
                        ${item.status === "cancelled" && "bg-red-500 text-white"}
                    `}
                >
                    { item.status === "paid" && "Đã thanh toán" }
                    { item.status === "pending" && "Chưa thanh toán" }
                    { item.status === "cancelled" && "Đã hủy" }
                </span>
            </div>
        </div>

        {/* ===== Courses ===== */}
        <div className="space-y-3 border-t border-gray-300 pt-4">
            {item.courses.map((course) => (
                <div
                    key={course.course_id}
                    className="flex gap-4 p-3 rounded-lg border border-gray-300"
                >
                    <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-[120px] h-[80px] rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1">
                        <h3 className="font-medium text-gray-800 line-clamp-2 text-[10px] md:text-[12px] lg:text-[16px]">
                            {course.title}
                        </h3>

                        <p className="text-[10px] md:text-[12px] lg:text-[14px] text-gray-500 mt-1">
                            {course.total_lectures} bài giảng
                        </p>

                        <p className="text-[10px] md:text-[12px] lg:text-[14px] font-semibold text-red-500 mt-2">
                            {course.price.toLocaleString()}đ
                        </p>
                    </div>
                </div>
            ))}
        </div>

        {/* ===== Footer ===== */}
        <div className="border-t border-gray-300 pt-3 space-y-1">

            {/* Giá gốc (chỉ hiện khi có giảm) */}
            {item.coupon && (
                <div className="flex justify-between text-[10px] md:text-[12px] lg:text-[14px] text-green-400">
                    <span>Giảm giá:</span>
                    <span>({item.coupon.code}) - {item.coupon.percent}%</span>
                </div>
            )}

            {/* Tổng thanh toán */}
            <div className="flex justify-between items-center">
                <span className="text-[10px] md:text-[12px] lg:text-[14px] font-medium text-gray-700">
                    Tổng thanh toán:
                </span>

                <span className="text-[12px] md:text-[14px] lg:text-[16px] font-bold text-red-600">
                {item.total.toLocaleString()}đ
                </span>
            </div>
        </div>

    </div>
  );
};

export default BoxCheckoutItem;
