import { medicineService } from "@/services";

export const useMedicineList = () => {
  const getList = async (offset: number) => {
    return await medicineService.list(offset);
  };

  return { getList };
};
