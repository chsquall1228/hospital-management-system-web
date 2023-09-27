import { medicineService } from "@/services";
import { Medicine } from "@/types/medicine";

export const useMedicine = () => {
  const get = async (id: string) => {
    return await medicineService.get(id);
  };

  const create = async (medicine: Medicine) => {
    return await medicineService.create(medicine);
  };

  const update = async (id: string, medicine: Medicine) => {
    return await medicineService.update(id, medicine);
  };

  return { get, create, update };
};
