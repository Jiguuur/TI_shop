import { Admin } from "service/auth/type";
import { PaginationResponse, SuccessResponse } from "types";
import http from "..";

namespace workers {
  export const list = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/employ/list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch workers list: ${response.status} ${response.statusText}`
      );
    }

    const dataResponse = await response.json();

    // Validate the response structure for login
    if (
      !dataResponse ||
      (!dataResponse.success && !Array.isArray(dataResponse))
    ) {
      throw new Error(
        `Invalid login response: Expected a success flag or an array of workers. Received: ${JSON.stringify(
          dataResponse
        )}`
      );
    }

    // If dataResponse is an array, return it directly
    return Array.isArray(dataResponse) ? dataResponse : dataResponse.workers; // Return only the workers array
  };
  export const deleteEmploy = (id: number) =>
    http.del<SuccessResponse>(`/user/delete/${id}`, {
      hasAuth: true,
    });
  export const updateWorkers = (body: any, id: number) =>
    http.put(`/user/update/${id}`, {
      hasAuth: true,
      body,
    });
  export const createWorkers = (body: any) =>
    http.post("/user/create", {
      hasAuth: true,
      body,
    });
}

export default workers;
