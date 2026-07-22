import { useState } from "react";
import { message } from "antd";
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";

const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        message.success("Gửi liên hệ thành công!");

        setForm({
            name: "",
            email: "",
            content: "",
        });
    };

    return (
        <div className="max-w-6xl mx-auto py-16 px-6">

            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">
                    Liên hệ
                </h1>

                <p className="text-gray-500 mt-3">
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Thông tin liên hệ */}

                <div className="bg-orange-50 rounded-2xl shadow p-8 flex flex-col justify-center">

                    <h2 className="text-2xl font-bold text-center mb-6">
                        Thông tin liên hệ
                    </h2>

                    <div className="space-y-6">

                        <div className="flex items-center ml-6 gap-4">
                            <EnvironmentOutlined className="text-2xl ml-2 text-[#FF782D]" />

                            <div>
                                <h3 className="font-semibold">Địa chỉ</h3>
                                <p className="text-gray-600">
                                    18 Phố Viên, Bắc Từ Liêm, Hà Nội
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <MailOutlined className="text-2xl  ml-2 text-[#FF782D]" />

                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-gray-600">
                                    hotro@edupress.vn
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <PhoneOutlined className="text-2xl  ml-2 text-[#FF782D]" />

                            <div>
                                <h3 className="font-semibold">Điện thoại</h3>
                                <p className="text-gray-600">
                                    (0123) 456-789
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <ClockCircleOutlined className="text-2xl  ml-2 text-[#FF782D]" />

                            <div>
                                <h3 className="font-semibold">Giờ làm việc</h3>
                                <p className="text-gray-600">
                                    Thứ 2 - Thứ 6 (08:00 - 17:30)
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow p-8"
                >

                    <h2 className="text-2xl text-center font-bold mb-6">
                        Gửi tin nhắn
                    </h2>

                    <div className="space-y-4">

                        <input
                            type="text"
                            placeholder="Họ và tên"
                            className="w-full border rounded-xl p-3 outline-none focus:border-[#FF782D]"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border rounded-xl p-3 outline-none focus:border-[#FF782D]"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                        />

                        <textarea
                            rows={5}
                            placeholder="Nội dung"
                            className="w-full border rounded-xl p-3 resize-none outline-none focus:border-[#FF782D]"
                            value={form.content}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    content: e.target.value,
                                })
                            }
                        />

                        <button
                            type="submit"
                            className="bg-[#FF782D] hover:bg-orange-600 transition text-white px-8 py-3 rounded-xl"
                        >
                            Gửi 
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ContactPage;