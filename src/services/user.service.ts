import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";
import Pagination from "@/constants/pagination";

export class UserService {
  protected readonly instance: AxiosInstance;
  public constructor(url: any) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  list = async (offset: number) => {
    const response = await this.instance.get("/users", {
      headers: getAuthorizationHeader(),
      params: {
        offset,
        limit: Pagination.itemPerPage,
      },
    });
    return response.data;
  };
}
