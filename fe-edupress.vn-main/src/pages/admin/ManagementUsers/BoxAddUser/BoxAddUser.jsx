import { useState } from "react";
import { Modal, Form, Input, Button, Alert } from "antd";
import axios from "axios";
import useFetchData from "../../../../api/useFetchData";    

const API_URL =
  "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=6957348a9dda81df11d0c527";
  
const BoxAddUser = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const { data: users = [] } = useFetchData("users");
  const [message, setMessage] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleAdd = async (values) => {
    setLoading(true);
    setMessage({ type: "", content: "" });

    // Check email
    const isExist = users.some((u) => u.email === values.email);

    if (isExist) {
      setMessage({
        type: "error",
        content: "Email đã tồn tại!",
      });
      setLoading(false);
      return;
    }

    const newUser = {
      email: values.email,
      username: values.username,
      password: values.password,
      role: "customer",
    };

    try {
      await axios.post(API_URL, newUser);

      setMessage({
        type: "success",
        content: "Thêm tài khoản thành công!",
      });
        refetch();
    } catch (error) {
      setMessage({
        type: "error",
        content: "Thêm tài khoản thất bại!. Vui lòng thử lại!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm tài khoản
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div>
            <h1 className="text-[20px] font-semibold text-[#000000">Thêm tài khoản mới</h1>
            <Form
                layout="vertical"
                onFinish={handleAdd}
                autoComplete="off"
                disabled={loading}
                
            >
                <Form.Item
                    className="custom-form-item"
                    label={<span className="text-[12px]">Email</span>}
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                    ]}
                >
                    <Input className="custom-input" placeholder="example@email.com"/>
                </Form.Item>

                <Form.Item
                    className="custom-form-item"
                    label={<span className="text-[12px]">Tên người dùng</span>}
                    name="username"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên người dùng!" },
                    ]}
                >
                    <Input className="custom-input" placeholder="Nguyen Van A" />
                </Form.Item>

                <Form.Item
                    className="custom-form-item"
                    label={<span className="text-[12px]">Mật khẩu</span>}
                    name="password"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu!" },
                        { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
                    ]}
                >
                    <Input.Password className="custom-input" placeholder="Nhập mật khẩu của người dùng" />
                </Form.Item>

                {message.content && (
                    <Alert
                        type={message.type}
                        showIcon
                        className="mb-3"
                        description={<span className="text-[12px]">{message.content}</span>}
                    />
                )}

                <Form.Item className="custom-form-item">
                    <Button
                        htmlType="submit"
                        loading={loading}
                        className="custom-btn w-full"
                    >
                        Xác nhận thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
      </Modal>
    </>
  );
};
export default BoxAddUser;