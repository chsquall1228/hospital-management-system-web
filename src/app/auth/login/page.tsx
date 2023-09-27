"use client";

import { Col, Row, Card, Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";

export default function Login() {
  const [activeTabKey, setActiveTabKey] = useState<string>("sign-in");
  const { login } = useLogin();
  const router = useRouter();
  const tabs = [
    {
      key: "sign-in",
      label: "Sign In",
    },
    {
      key: "sign-up",
      label: "Sign Up",
    },
  ];

  const onFinish = (value: any) => {
    login(value.username, value.password)
      .then((res) => router.push("/dashboard"))
      .catch((e) => alert(e));
  };

  const contentList: Record<string, React.ReactNode> = {
    "sign-in": (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    ),
    "sign-up": <p></p>,
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 8, offset: 8 }}>
          <Card
            style={{ width: "100%", marginTop: "50%" }}
            tabList={tabs}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}>
            {contentList[activeTabKey]}
          </Card>
        </Col>
      </Row>
    </>
  );
}
