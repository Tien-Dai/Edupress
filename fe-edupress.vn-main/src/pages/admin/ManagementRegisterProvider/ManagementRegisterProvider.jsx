import { useState } from "react";
import { Table, Space, Tag, Popconfirm, message, Switch } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import usePendingProviders from "../../../hooks/usePendingProvider";
import useApproveProvider from "../../../hooks/useApproveProvider";

const ManagementRegisterProvider = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: providers = [], isLoading, refetch, isFetching } = usePendingProviders();
  const { mutate: approveProvider, isPending } = useApproveProvider();

  const handleApprove = (providerId) => {
    approveProvider(
      { providerId },
      {
        onSuccess: (res) => {
          message.success(res?.message || "Đã duyệt giảng viên");
          refetch(); // duyệt xong biến mất khỏi pending
        },
        onError: (err) => {
          message.error(err?.response?.data?.message || "Duyệt thất bại");
        },
      }
    );
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "_id",
      key: "_id",
      width: 220,
      render: (v) => (
        <span className="text-[12px] text-[#000000] font-semibold">#{v}</span>
      ),
    },
    {
      title: "Tên Giảng viên",
      dataIndex: "provider_name",
      key: "provider_name",
      ellipsis: true,
      render: (text) => <p className="font-semibold line-clamp-1">{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Nghề nghiệp",
      dataIndex: "career",
      key: "career",
      ellipsis: true,
      render: (text) => <Tag color="blue">{text || "—"}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 220,
      render: (_, record) => {
        const isApproved = record.status === "approved";
        return (
          <Space>
            <Tag color={isApproved ? "green" : "orange"}>
              {isApproved ? "Đã duyệt" : "Chờ duyệt"}
            </Tag>

            {/* Switch: chỉ duyệt 1 chiều pending -> approved */}
            <Popconfirm
              title="Bạn chắc chắn muốn duyệt giảng viên này?"
              okText="Duyệt"
              cancelText="Hủy"
              onConfirm={() => handleApprove(record._id)}
              disabled={isApproved}
            >
              <Switch
                checked={isApproved}
                disabled={isApproved} 
                loading={isPending}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (date) => new Date(date).toLocaleString("vi-VN"),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-[18px] font-semibold">
          Quản lý đăng ký giảng viên
        </h1>

        <button
          onClick={() => refetch()}
          className="
            border border-dashed border-[#c8c8c8] text-[#000000] px-3 py-2 rounded-[5px]
            transition duration-300 ease-in-out hover:scale-95 hover:opacity-65 cursor-pointer
          "
        >
          <ReloadOutlined /> Làm mới
        </button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={providers}
        loading={isLoading || isFetching}
        pagination={{
          current: page,
          pageSize,
          total: providers?.length || 0,  
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
          onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
          },
          showTotal: (t) => `Tổng: ${t}`,
        }}
      />
    </div>
  );
};

export default ManagementRegisterProvider;