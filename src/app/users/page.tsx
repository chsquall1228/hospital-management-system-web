"use client";

import { Table } from "antd";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { User } from "@/types/user";
import { TableParams } from "@/types/table-params";
import { useUserList } from "@/hooks/users/useUserList";
import Pagination from "@/constants/pagination";

const columns: ColumnsType<User> = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "NRIC",
    dataIndex: "nric",
    key: "nric",
  },
];

export default function Users() {
  const { getList } = useUserList();
  const [data, setData] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = async (offset = 0) => {
    const { items, total } = await getList(offset);
    setTableParams({
      pagination: { pageSize: Math.ceil(total / Pagination.itemPerPage) },
    });
    setData(items);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  return (
    <Layout>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        // onChange={handleTableChange}
      />
    </Layout>
  );
}
