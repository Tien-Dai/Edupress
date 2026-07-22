import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

const Register = () => {
  const [message, setMessage] = useState({
    type: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setMessage({
      type: "",
      content: "",
    });

    try {
      const res = await api.post("/register", {
        email: values.email,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      setMessage({
        type: "success",
        content: res.data.message || "Đăng ký thành công!",
      });

      setTimeout(() => {
        nav("/login");
      }, 1000);
    } catch (err) {
      setMessage({
        type: "error",
        content:
          err.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bgr_login min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-12 w-full max-w-5xl">

        {/* Image */}
        <div className="hidden sm:block">
          <img
            src="/images/img_register.png"
            alt="register"
            className="w-[260px] md:w-[320px] lg:w-[360px] animate-[bounce_5s_infinite]"
          />
        </div>

        {/* Form */}
        <div className="w-full max-w-[360px] lg:max-w-[400px] bg-white px-6 py-[20px] lg:p-8 rounded-xl shadow-lg">

          <h3 className="text-[28px] font-semibold text-gray-900 mb-2 text-center">
            Đăng ký
          </h3>

          <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            disabled={loading}
          >
            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Email</span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                {
                  type: "email",
                  message: "Email không hợp lệ!",
                },
              ]}
            >
              <Input
                className="custom-input"
                placeholder="example@email.com"
              />
            </Form.Item>

            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Tên người dùng</span>}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên người dùng!",
                },
              ]}
            >
              <Input
                className="custom-input"
                placeholder="Nguyễn Văn A"
              />
            </Form.Item>

            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Mật khẩu</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  min: 6,
                  message: "Mật khẩu tối thiểu 6 ký tự!",
                },
              ]}
            >
              <Input.Password
                className="custom-input"
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Xác nhận mật khẩu</span>}
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("password") === value
                    ) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className="custom-input"
                placeholder="Nhập lại mật khẩu"
              />
            </Form.Item>

            {message.content && (
              <Alert
                className="mb-3"
                showIcon
                type={message.type}
                description={
                  <span className="text-[12px]">
                    {message.content}
                  </span>
                }
              />
            )}

            <Form.Item className="custom-form-item">
              <Button
                htmlType="submit"
                loading={loading}
                className="custom-btn w-full"
              >
                Đăng ký
              </Button>
            </Form.Item>

            <p className="text-center text-[12px] text-gray-600">
              Đã có tài khoản?

              <Link
                to="/login"
                className="text-blue-600 hover:underline ml-1"
              >
                Đăng nhập
              </Link>
            </p>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;