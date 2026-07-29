import { useState } from "react";
import { Modal, Form, Input, Button, Alert } from "antd";
import { api } from "../../../../api/api";
import useFetchData from "../../../../api/useFetchData";

const BoxAddUser = ({ refetch }) => {
  const [open, setOpen] = useState(false);

  const { data: users = [] } = useFetchData("users");

  const [message, setMessage] = useState({
    type: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleAdd = async (values) => {
    setLoading(true);
    setMessage({
      type: "",
      content: "",
    });

    // Kiểm tra email đã tồn tại
    const isExist = users.some(
      (u) => u.email === values.email
    );

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
      await api.post("/users", newUser);

      setMessage({
        type: "success",
        content: "Thêm tài khoản thành công!",
      });

      refetch();

      setTimeout(() => {
        setOpen(false);
      }, 800);
    } catch (error) {
      console.log(error);

      setMessage({
        type: "error",
        content: "Thêm tài khoản thất bại!",
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
        destroyOnClose
      >
        <h1 className="text-[20px] font-semibold text-black mb-4">
          Thêm tài khoản mới
        </h1>

        <Form
          layout="vertical"
          onFinish={handleAdd}
          autoComplete="off"
          disabled={loading}
        >
          <Form.Item
            label="Email"
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
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người dùng!",
              },
            ]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
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
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          {message.content && (
            <Alert
              type={message.type}
              showIcon
              className="mb-3"
              message={message.content}
            />
          )}

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              block
            >
              Xác nhận thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BoxAddUser;