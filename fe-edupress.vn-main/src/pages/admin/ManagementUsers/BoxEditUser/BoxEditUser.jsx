import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Alert } from "antd";
import { api } from "../../../../api/api";

const BoxEditUser = ({ record, refetch }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [message, setMessage] = useState({
    type: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setMessage({
      type: "",
      content: "",
    });
    setOpen(true);
  };

  useEffect(() => {
    if (record && open) {
      form.setFieldsValue({
        email: record.email,
        username: record.username,
        password: "",
      });
    }
  }, [record, open, form]);

  const handleUpdate = async (values) => {
    setLoading(true);
    setMessage({
      type: "",
      content: "",
    });

    try {
      await api.put(`/users/${record._id}`, {
        ...record,
        ...values,
      });

      setMessage({
        type: "success",
        content: "Cập nhật thành công!",
      });

      refetch();

      setTimeout(() => {
        setOpen(false);
        form.resetFields();
      }, 800);
    } catch (error) {
      console.log(error);

      setMessage({
        type: "error",
        content: "Cập nhật thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="
          bg-blue-500
          text-white
          px-4
          py-2
          rounded-md
          cursor-pointer
          transition
          hover:opacity-80
        "
        onClick={showModal}
      >
        Sửa
      </button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <h1 className="text-[20px] font-semibold mb-4">
          Chỉnh sửa tài khoản
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
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
            <Input />
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                min: 6,
                message: "Mật khẩu tối thiểu 6 ký tự!",
              },
            ]}
          >
            <Input.Password placeholder="Để trống nếu không đổi mật khẩu" />
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
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Xác nhận sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BoxEditUser;