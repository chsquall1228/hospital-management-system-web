"use client";
import Layout from "../../components/layout";

import { Input, Space, Button, message, Col, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { Medicine } from "@/types/medicine";
import { useMedicine } from "@/hooks/medicines/useMedicine";
import { useRouter, useParams } from "next/navigation";
import Form from "../components/form";
import { useEffect, useState } from "react";
import moment from "moment";

export default function New() {
  const [form] = useForm();
  const { get, update } = useMedicine();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const medicationId = params.id as string;
  const loadData = async () => {
    try {
      setLoading(true);
      const medication = await get(medicationId);
      form.setFieldsValue(medication);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: Medicine) => {
    try {
      setLoading(true);
      await update(medicationId, values);
      messageApi.success("Medicine Updated");
      router.push("/medicines");
    } catch (e) {
      messageApi.error("Unable to process create medicine");
    } finally {
      setLoading(true);
    }
  };

  return (
    <>
      <Layout>
        {contextHolder}
        <Row>
          <Col span={24}>
            <Form form={form} onFinish={onFinish}></Form>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <i>
              Created at{" "}
              {moment(form.getFieldValue("createdAt")).format("YYYY-MM-DD")}
            </i>
          </Col>
        </Row>
      </Layout>
    </>
  );
}
