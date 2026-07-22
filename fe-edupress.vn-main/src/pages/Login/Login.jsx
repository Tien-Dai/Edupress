import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { message } from "antd";
import useLogin from "../../hooks/useLogin";

export default function Login() {

  const nav = useNavigate();
  const { login } = useAuth();

  const { mutate: loginMutate, isPending } = useLogin();

  const onFinish = (values) => {
    loginMutate(values, {
      onSuccess: (data) => {
        const { accessToken, refreshToken, user } = data;

        login({ user, accessToken, refreshToken });

        message.success("Đăng nhập thành công!");

        if (user.role === "admin") {
          nav("/admin/employee");
        } else if (user.role === "provider") {
          nav("/admin/course");
        } else {
          nav("/"); 
        }
      },

      onError: (error) => {
        message.error(
          error?.response?.data?.message || "Đăng nhập thất bại!"
        );
      },
    });
  };


  return (
   <div className="bgr_login min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-12 w-full max-w-5xl">

        {/* Image */}
        <div className="hidden sm:block">
          <img
            src="/images/img_login.png"
            alt="login"
            className="w-[260px] md:w-[320px] lg:w-[360px] animate-[bounce_5s_infinite]"
          />
        </div>

        {/* Form Wrapper */}
        <div
          className="w-full max-w-[360px] lg:max-w-[400px]
                     bg-white p-6 lg:p-8 rounded-xl shadow-lg"
        >
          {/* Title */}
          <h3 className="text-[28px] font-semibold text-gray-900 mb-6 text-center">
            Đăng nhập
          </h3>

          <Form
            disabled={isPending}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* Email */}
            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                placeholder="example@email.com"
                className="text-[14px] custom-input"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Mật khẩu</span>}
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
              ]}
            >
              <Input.Password
                placeholder="••••••••"
                className="text-[14px] custom-input"
              />
            </Form.Item>

            {/* Message */}
            {message?.content && (
              <div className="mb-4">
                <Alert
                  type={message.type}
                  showIcon
                  description={
                    <span className="text-[12px]">
                      {message.content}
                    </span>
                  }
                />
              </div>
            )}

            {/* Button */}
            <Form.Item
              className="custom-form-item"
            >
              <Button
                className="custom-btn"
                htmlType="submit"
                loading={isPending}
              >
                Đăng nhập
              </Button>
            </Form.Item>

            {/* Register */}
            <p className="text-center text-[10px] sm:text-[12px] text-gray-600">
              Nếu bạn chưa có tài khoản?
              <Link to="/register" className="text-blue-600 hover:underline ml-1">
                Đăng ký
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
