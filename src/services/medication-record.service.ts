import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";
import Pagination from "@/constants/pagination";
import { MedicationRecord } from "@/types/medication-record";

export class MedicationRecordService {
  protected readonly instance: AxiosInstance;
  public constructor(url: any) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  list = async (offset: number) => {
    const response = await this.instance.get("/medication-records", {
      headers: getAuthorizationHeader(),
      params: {
        offset,
        limit: Pagination.itemPerPage,
      },
    });
    return response.data;
  };

  get = async (id: string) => {
    const response = await this.instance.get(`/medication-records/${id}`, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  };

  create = async (record: MedicationRecord) => {
    const response = await this.instance.post(`/medication-records/`, record, {
      headers: getAuthorizationHeader(),
    });
    return response.data;
  };

  update = async (id: string, record: MedicationRecord) => {
    const response = await this.instance.patch(
      `/medication-records/${id}`,
      record,
      {
        headers: getAuthorizationHeader(),
      }
    );
    return response.data;
  };
}
