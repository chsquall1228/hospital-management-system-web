"use client";

import { Button, Space, Table } from "antd";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { TableParams } from "@/types/table-params";
import Pagination from "@/constants/pagination";
import { Medicine } from "@/types/medicine";
import { useMedicineList } from "@/hooks/medicines/useMedicineList";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const columns: ColumnsType<Medicine> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
];

export default function Medicines() {
  const router = useRouter();
  const { getList } = useMedicineList();
  const [data, setData] = useState<Medicine[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: Pagination.itemPerPage,
    },
  });
  const fetchData = async (offset = 0) => {
    const { items, total } = await getList(offset);
    setTableParams({
      pagination: {
        current: Math.ceil(total / Pagination.itemPerPage),
      },
    });
    setData(items);
    setLoading(false);
  };

  const onClickAdd = () => {
    router.push("/medicines/new");
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  return (
    <Layout>
      <Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={onClickAdd}>
          Add
        </Button>
      </Space>
      <br />
      <br />
      <Table
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              router.push(`/medicines/${record.id}`);
            }, // click row
          };
        }}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        // onChange={handleTableChange}
      />
    </Layout>
  );
}
