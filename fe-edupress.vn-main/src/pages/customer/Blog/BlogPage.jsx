const BlogPage = () => {
    const blogs = [
        {
            id: 1,
            title: "Lộ trình học ReactJS cho người mới",
            date: "20/07/2026",
            image:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
            desc:
                "Khám phá lộ trình học ReactJS từ cơ bản đến nâng cao dành cho người mới bắt đầu."
        },
        {
            id: 2,
            title: "NodeJS và Express có gì đặc biệt?",
            date: "18/07/2026",
            image:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900",
            desc:
                "Tìm hiểu cách xây dựng RESTful API với NodeJS và Express."
        },
        {
            id: 3,
            title: "MongoDB trong phát triển Web",
            date: "15/07/2026",
            image:
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900",
            desc:
                "Giới thiệu MongoDB và cách sử dụng trong các ứng dụng MERN Stack."
        }
    ];

    return (
        <div className="bg-[#fafafa] min-h-screen">
            

            {/* BLOG */}
            <div className="max-w-7xl mx-auto px-5 py-20">

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {blogs.map((blog) => (

                        <div
                            key={blog.id}
                            className="
                            bg-white
                            rounded-2xl
                            overflow-hidden
                            shadow-md
                            hover:shadow-2xl
                            hover:-translate-y-2
                            transition-all
                            duration-300
                        "
                        >

                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-60 object-cover"
                            />

                            <div className="p-6">

                                <p className="text-[#FF782D] font-semibold">
                                    {blog.date}
                                </p>

                                <h2 className="text-2xl font-bold mt-3">
                                    {blog.title}
                                </h2>

                                <p className="text-gray-600 leading-7 mt-4">
                                    {blog.desc}
                                </p>

                                <button
                                    className="
                                    mt-6
                                    text-[#FF782D]
                                    font-semibold
                                    hover:underline
                                "
                                >
                                    Đọc tiếp →
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
};

export default BlogPage;    