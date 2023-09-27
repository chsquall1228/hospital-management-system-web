"use client";
import Layout from "../../components/layout";

import { Input, Space, Button, message, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { Medicine } from "@/types/medicine";
import { useMedicine } from "@/hooks/medicines/useMedicine";
import { useRouter } from "next/navigation";
import Form from "../components/form";
import { useState } from "react";

export default function New() {
  const [form] = useForm();
  const { create } = useMedicine();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onFinish = async (values: Medicine) => {
    try {
      setLoading(true);
      await create(values);
      messageApi.success("Medication Record Created");
      router.push("/medicines");
    } catch (e) {
      messageApi.error("Unable to process create medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        {contextHolder}
        <Spin spinning={loading}>
          <Form form={form} onFinish={onFinish}></Form>
        </Spin>
      </Layout>
    </>
  );
}
