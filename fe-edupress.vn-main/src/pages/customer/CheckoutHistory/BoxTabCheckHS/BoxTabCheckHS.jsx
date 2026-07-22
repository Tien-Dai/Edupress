


import React, { useMemo } from "react";
import { Tabs } from "antd";
import BoxCheckoutItem from "../BoxCheckoutItem/BoxCheckoutItem";

const BoxTabCheckHS = ({ data = [], user }) => {
  const allItems  = useMemo(
    () => data.filter((item) => item.status !== "pending"),
    [data]
  );
  const paidItems = useMemo(
    () => data.filter((item) => item.status === "paid"),
    [data]
  );
  const cancelledItems = useMemo(
    () => data.filter((item) => item.status === "cancelled"),
    [data]
  );

  const renderList = (items) => (
    <div className="grid gap-4">
      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          Không có khóa học nào
        </div>
      ) : (
        items.map((order) => (
          <BoxCheckoutItem key={order._id} item={order} user={user} />
        ))
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
      <Tabs
        defaultActiveKey="all"
        className="custom-tabs"
        items={[
          {
            key: "all",
            label: "Tất cả",
            children: renderList(allItems),
          },
          {
            key: "paid",
            label: "Đã thanh toán",
            children: renderList(paidItems),
          },
          {
            key: "cancelled",
            label: "Đã hủy",
            children: renderList(cancelledItems),
          },
        ]}
      />
    </div>
  );
};

export default BoxTabCheckHS;
