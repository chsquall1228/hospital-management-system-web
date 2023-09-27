import { medicationRecordService } from "@/services";
import { MedicationRecord } from "@/types/medication-record";

export const useMedicine = () => {
  const get = async (id: string) => {
    return await medicationRecordService.get(id);
  };

  const create = async (record: MedicationRecord) => {
    return await medicationRecordService.create(record);
  };

  const update = async (id: string, record: MedicationRecord) => {
    return await medicationRecordService.update(id, record);
  };

  return { get, create, update };
};
