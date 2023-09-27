import TextArea from "antd/es/input/TextArea";

import {
  Form as AForm,
  Input,
  Space,
  Button,
  FormInstance,
  DatePicker,
  Card,
  Typography,
  Modal,
  TimePicker,
} from "antd";
import {
  MedicationRecord,
  MedicationRecordItem,
} from "@/types/medication-record";
import { CloseOutlined, SmileOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Select from "rc-select";
import InputNumber from "rc-input-number";

const useResetFormOnCloseModal = ({
  form,
  open,
}: {
  form: FormInstance;
  open: boolean;
}) => {
  const prevOpenRef = useRef<boolean>();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};

function ModalForm({ open, onCancel }: { open: boolean; onCancel: () => {} }) {
  const [form] = AForm.useForm();

  useResetFormOnCloseModal({
    form,
    open,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title="Medication" open={open} onOk={onOk} onCancel={onCancel}>
      <AForm form={form} layout="vertical" name="itemForm">
        <AForm.Item
          name="medicine"
          label="Medicine"
          rules={[{ required: true }]}>
          <Select
            style={{ width: 120 }}
            loading
            options={[{ value: "lucy", label: "Lucy" }]}
          />
        </AForm.Item>
        <AForm.Item name="tablets" label="Tablets">
          <InputNumber />
        </AForm.Item>
        <AForm.Item name="mg" label="mg">
          <InputNumber />
        </AForm.Item>
        <AForm.Item name="period">
          <DatePicker.RangePicker />
        </AForm.Item>
        <AForm.Item name="times">
          <TimePicker.RangePicker />
        </AForm.Item>
        <AForm.Item name="description">
          <TextArea rows={4} />
        </AForm.Item>
      </AForm>
    </Modal>
  );
}

export default function Form({
  form,
  onFinish,
}: {
  form: FormInstance<MedicationRecord>;
  onFinish: any;
}) {
  const [open, setOpen] = useState(false);

  const showItemModal = () => {
    setOpen(true);
  };

  const hideItemModal = () => {
    setOpen(false);
  };

  return (
    <>
      <AForm
        form={form}
        name="validateOnly"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off">
        <AForm.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}>
          <TextArea rows={4} />
        </AForm.Item>
        <AForm.Item
          name="issedAt"
          label="Issued At"
          rules={[{ required: true }]}>
          <DatePicker />
        </AForm.Item>
        <AForm.Item label="Items" name="items">
          {({ getFieldValue }) => {
            const items: MedicationRecordItem[] = getFieldValue("items") || [];
            return items.length ? (
              <ul>
                {items.map((item) => (
                  <li key={item.medicine.name} className="user">
                    <Space>{`${item.medicine.name}`}</Space>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography.Text className="ant-form-text" type="secondary">
                ( <SmileOutlined /> No item yet. )
              </Typography.Text>
            );
          }}
          <Button
            htmlType="button"
            style={{ margin: "0 8px" }}
            onClick={showItemModal}>
            Add Item
          </Button>
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
      <ModalForm open={open} onCancel={hideItemModal} />
    </>
  );
}
