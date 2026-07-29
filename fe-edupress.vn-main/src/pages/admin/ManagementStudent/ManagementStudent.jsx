import { useEffect, useState } from "react";
import { Table, Card } from "antd";
import { api } from "../../../api/api";

const ManagementStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/students");

      setStudents(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
      width: 80,
    },
    {
      title: "Học viên",
      dataIndex: ["user_id", "username"],
    },
    {
      title: "Email",
      dataIndex: ["user_id", "email"],
    },
    {
      title: "Khóa học đã đăng ký",
      dataIndex: ["course_id", "course_title"],
    },
  ];

  return (
    <Card title="Quản lý học viên">
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={students}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default ManagementStudent;