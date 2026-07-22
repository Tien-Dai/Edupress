import { useEffect, useState } from "react";
import { message, Popconfirm } from "antd";

const PopopConfirm = ({ handleRemoveFromCart }) => {
  const [removed, setRemoved] = useState(false);

  const onConfirm = async () => {
    await handleRemoveFromCart();
    setRemoved(true);
  };

  useEffect(() => {
    if (removed) {
      message.success("Đã xóa khóa học khỏi giỏ");
      setRemoved(false);
    }
  }, [removed]);

  return (
    <>
      <Popconfirm
        title="Xóa khóa học"
        description="Bạn chắc chắn muốn xóa khóa học này?"
        onConfirm={onConfirm}
        okText="Xóa"
        cancelText="Hủy"
      >
        <button className="text-sm text-red-500 hover:underline">
          Xóa khỏi giỏ
        </button>
      </Popconfirm>
    </>
  );
};

export default PopopConfirm;
