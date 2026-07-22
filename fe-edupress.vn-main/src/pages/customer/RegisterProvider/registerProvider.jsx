import { Form, Input, Button, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import useCreateProvider from "../../../hooks/useCreateProvider";

const { TextArea } = Input;

const RegisterProvider = () => {
  const [form] = Form.useForm();
  const createProvider = useCreateProvider();

  const onFinish = async (values) => {
    try {
      const payload = {
        provider_name: values.provider_name,
        career: values.career,
        email: values.email,
        images: null,
      };

      await createProvider.mutateAsync(payload);
      message.success("Gửi đăng ký thành công! Vui lòng chờ admin duyệt.");
      form.resetFields();
    } catch (err) {
      message.error(err?.response?.data?.message || "Gửi đăng ký thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-[1080px] px-[15px] lg:px-0 mx-auto relative ">
             <div className="w-[500px] px-[15px] lg:px-0">
                <Card className="shadow-sm" title="Đăng ký trở thành Giảng Viên">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="mt-2"
                    >
                        <Form.Item
                            label="Tên giảng viên"
                            name="provider_name"
                            rules={[{ required: true, message: "Vui lòng nhập tên giảng viên" }]}
                        >
                        <Input placeholder="Ví dụ: Nguyễn Văn A" />
                        </Form.Item>

                        <Form.Item
                            label="Email liên hệ"
                            name="email"
                            rules={[
                                { required: true, message: "Vui lòng nhập email" },
                                { type: "email", message: "Email không hợp lệ" },
                            ]}
                        >
                        <Input placeholder="abc@gmail.com" />
                        </Form.Item>

                        <Form.Item
                            label="Ngành nghề / Lĩnh vực"
                            name="career"
                            rules={[{ required: false }]}
                        >
                        <TextArea
                            rows={3}
                            placeholder="Ví dụ: Dạy tiếng Anh, luyện thi IELTS..."
                        />
                        </Form.Item>

                        

                        <div className="flex gap-3 justify-end">
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    setFileList([]);
                                }}
                            >
                                Nhập lại
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{backgroundColor:'#FF7D35'}}
                                loading={createProvider.isPending}
                            >
                                Gửi đăng ký
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    </div>
  );
}


export default RegisterProvider;