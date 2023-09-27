import { userService } from "@/services";

export const useUserList = () => {
  const getList = async (offset: number) => {
    return await userService.list(offset);
  };

  return { getList };
};
