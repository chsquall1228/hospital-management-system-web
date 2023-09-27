"use client";

import React, { useState } from "react";
import {
  FolderOutlined,
  MedicineBoxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout as ALayout, Menu, Button, theme, message } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { MenuInfo } from "rc-menu/lib/interface";
import { ScriptProps } from "next/script";

const { Header, Sider, Content } = ALayout;

export default function Layout({ children }: ScriptProps) {
  const [menuKey, setMenuKey] = useState(usePathname());
  const router = useRouter();
  const onClickMenu = ({ key }: MenuInfo) => {
    router.push(key);
  };
  const [messageApi, contextHolder] = message.useMessage();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ALayout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={onClickMenu}
          defaultSelectedKeys={[menuKey]}
          items={[
            {
              key: "/users",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: "/medicines",
              icon: <MedicineBoxOutlined />,
              label: "Medicines",
            },
            {
              key: "/medication-records",
              icon: <FolderOutlined />,
              label: "Medication Records",
            },
          ]}
        />
      </Sider>
      <ALayout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: 0,
            background: colorBgContainer,
          }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}>
          {contextHolder}
          {children}
        </Content>
      </ALayout>
    </ALayout>
  );
}
