import { medicationRecordService } from "@/services";

export const useMedicationRecrodList = () => {
  const getList = async (offset: number) => {
    return await medicationRecordService.list(offset);
  };

  return { getList };
};
