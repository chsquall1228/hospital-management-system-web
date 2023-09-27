import TextArea from "antd/es/input/TextArea";

import { Form as AForm, Input, Space, Button, FormInstance } from "antd";
import { Medicine } from "@/types/medicine";

export default function Form({
  form,
  onFinish,
}: {
  form: FormInstance<Medicine>;
  onFinish: any;
}) {
  return (
    <>
      <AForm
        form={form}
        name="validateOnly"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off">
        <AForm.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </AForm.Item>
        <AForm.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}>
          <TextArea rows={4} />
        </AForm.Item>
        <AForm.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </AForm.Item>
      </AForm>
    </>
  );
}
