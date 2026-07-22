const AboutPage = () => {
    return (
        <div className="max-w-7xl mx-auto py-16 px-6">

            {/* Tiêu đề */}

            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold">
                    Về EduPress
                </h1>

                <p className="text-gray-500 mt-4 max-w-3xl mx-auto leading-8">
                    EduPress là nền tảng học trực tuyến giúp kết nối học viên với
                    giảng viên thông qua các khóa học chất lượng cao về lập trình,
                    công nghệ và kỹ năng thực tế.
                </p>
            </div>

            {/* Giới thiệu */}

            <div className="grid lg:grid-cols-2 gap-16 items-center">

                <div className="flex justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200"
                        alt="EduPress"
                        className="w-[500px] rounded-2xl shadow-lg"
                    />
                </div>

                <div>

                    <h2 className="text-3xl font-bold leading-snug mb-6">
                        Học tập hiện đại,
                        <span className="text-[#FF782D]">
                            {" "}phát triển tương lai
                        </span>
                    </h2>

                    <p className="text-gray-600 leading-8 mb-5">
                        EduPress được xây dựng với mục tiêu mang đến một môi
                        trường học tập trực tuyến hiện đại, nơi học viên có thể
                        tiếp cận các khóa học chất lượng mọi lúc, mọi nơi.
                    </p>

                    <p className="text-gray-600 leading-8">
                        Chúng tôi tập trung vào các lĩnh vực như Web Development,
                        Mobile, AI, Data Science và nhiều kỹ năng thực tế,
                        giúp người học nâng cao năng lực và phát triển sự nghiệp.
                    </p>

                </div>

            </div>

            {/* Thống kê */}

            <div className="grid md:grid-cols-3 gap-8 mt-20">

                <div className="bg-white rounded-2xl shadow border p-8 text-center">
                    <h2 className="text-4xl font-bold text-[#FF782D]">
                        100+
                    </h2>

                    <p className="mt-3 text-gray-600 text-lg">
                        Khóa học
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow border p-8 text-center">
                    <h2 className="text-4xl font-bold text-[#FF782D]">
                        5000+
                    </h2>

                    <p className="mt-3 text-gray-600 text-lg">
                        Học viên
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow border p-8 text-center">
                    <h2 className="text-4xl font-bold text-[#FF782D]">
                        50+
                    </h2>

                    <p className="mt-3 text-gray-600 text-lg">
                        Giảng viên
                    </p>
                </div>

            </div>

            {/* Sứ mệnh */}

            <div className="mt-20 bg-orange-50 rounded-2xl p-10">

                <h2 className="text-3xl font-bold mb-5">
                    Sứ mệnh của chúng tôi
                </h2>

                <p className="text-gray-600 leading-8">
                    Chúng tôi mong muốn xây dựng một hệ sinh thái học tập trực tuyến
                    đơn giản, hiện đại và hiệu quả, giúp học viên tiếp cận kiến thức
                    chất lượng cũng như tạo điều kiện để giảng viên chia sẻ kinh
                    nghiệm tới cộng đồng.
                </p>

            </div>

        </div>
    );
};

export default AboutPage;