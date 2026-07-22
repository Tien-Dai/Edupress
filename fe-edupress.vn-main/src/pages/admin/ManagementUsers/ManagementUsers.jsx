import { Table, Tag } from "antd";
import { useMemo } from "react";
import useFetchUser from "../../../hooks/useFetchUser";

const ManagementUsers = () => {
  const { data: users = [], isLoading } = useFetchUser();

  const showUsers = useMemo(() => {
    return [...users].sort((a, b) => b._id.localeCompare(a._id));
  }, [users]);

  const columns = [
    {
      title: "Tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        if (role === "admin") return <Tag color="red">Admin</Tag>;
        if (role === "provider") return <Tag color="blue">Provider</Tag>;
        return <Tag color="green">Customer</Tag>;
      },
    },
  ];

  return (
    <div>
      <h1 className="text-[18px] font-semibold mb-3">
        Thông tin người dùng
      </h1>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={showUsers}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        className="shadow-lg rounded-2xl border border-dashed border-[#c8c8c8] px-3"
      />
    </div>
  );
};

export default ManagementUsers;