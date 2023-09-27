"use client";

import { Button, Space, Table } from "antd";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { TableParams } from "@/types/table-params";
import Pagination from "@/constants/pagination";
import { MedicationRecord } from "@/types/medication-record";
import { useMedicationRecrodList } from "@/hooks/medication-records/useMediciationRecordList";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";

const columns: ColumnsType<MedicationRecord> = [
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

export default function MedicationRecords() {
  const router = useRouter();
  const { getList } = useMedicationRecrodList();
  const [data, setData] = useState<MedicationRecord[]>();
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

  const onClickAdd = () => {
    router.push("/medication-records/new");
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
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              router.push(`/medicines/${record.id}`);
            }, // click row
          };
        }}
        // onChange={handleTableChange}
      />
    </Layout>
  );
}
