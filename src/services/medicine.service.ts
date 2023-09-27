import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";
import Pagination from "@/constants/pagination";
import { Medicine } from "@/types/medicine";

export class MedicineService {
  protected readonly instance: AxiosInstance;
  public constructor(url: any) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  list = async (offset: number) => {
    const response = await this.instance.get("/medicines", {
      headers: getAuthorizationHeader(),
      params: {
        offset,
        limit: Pagination.itemPerPage,
      },
    });
    return response.data;
  };

  get = async (id: string) => {
    const response = await this.instance.get(`/medicines/${id}`, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  };

  create = async (medicine: Medicine) => {
    const response = await this.instance.post(`/medicines/`, medicine, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  };

  update = async (id: string, medicine: Medicine) => {
    const response = await this.instance.patch(`/medicines/${id}`, medicine, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  };
}
