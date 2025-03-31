import { PaginationResponse, SuccessResponse } from "types";
import http from "../..";
import { CustomerCompanyType } from "./type";

namespace customerCompany {
  export const list = async () => {
    const response = await fetch("http://localhost:4000/company/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch workers list: ${response.status} ${response.statusText}`);
    }

    const dataResponse = await response.json();

    if (!dataResponse || (!dataResponse.success && !Array.isArray(dataResponse))) {
      throw new Error(`Invalid login response: Expected a success flag or an array of workers. Received: ${JSON.stringify(dataResponse)}`);
    }

    return Array.isArray(dataResponse) ? dataResponse : dataResponse.workers; 
  };

  export const create = (body: any) =>
    http.post<SuccessResponse>("/customer-company/create", {
      hasAuth: true,
      body,
    });

  export const deleteA = (id: number) =>
    http.del<SuccessResponse>(`/customer-company/delete/${id}`, {
      hasAuth: true,
    });

  export const update = (body: any, id: number) =>
    http.put<SuccessResponse>(`/customer-company/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default customerCompany;
