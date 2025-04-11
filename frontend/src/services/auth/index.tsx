import { decryptWithAES, encryptWithAES } from "utils/parse";
import http from "..";
import { Admin, LoginCustomerResponse, LoginData, LoginResponse } from "./type";
import dotenv from "dotenv";

dotenv.config();
const API_URL = import.meta.env.VITE_API_URL;
const tokenKey = "token";
const userKey = "app.user";
namespace auth {
  export const login = async (data: LoginData) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle different error status codes appropriately
        if (response.status === 401) {
          throw new Error("Invalid username or password. Please try again.");
        }

        // Try to get error details from response if possible
        let errorDetails = "";
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await response.json();
            errorDetails = errorData.message || JSON.stringify(errorData);
          } catch (e) {
            // Could not parse JSON error message
          }
        }

        throw new Error(
          `Authentication failed: ${response.status}${
            errorDetails ? ` - ${errorDetails}` : ""
          }`
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const dataResponse = await response.json();
        console.log("Login response:", dataResponse);

        if (!dataResponse.token || !dataResponse.role_name) {
          throw new Error(
            "Login response is not valid: Token or role_name is missing"
          );
        }

        localStorage.setItem(tokenKey, dataResponse.token);
        return dataResponse;
      }
      throw new Error("Received non-JSON response");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  export const loginCustomer = (body?: any) =>
    http.post<LoginCustomerResponse>("/customer-company/login", {
      body,
    });
  export const saveToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
  };

  export const hasToken = () => !!localStorage.getItem(tokenKey);
  export const removeToken = () => localStorage.removeItem(tokenKey);
  export const getToken = () => localStorage.getItem(tokenKey);


  export const rememberUser = (values: LoginData) => {
    if (values.remember) {
      localStorage.setItem(userKey, encryptWithAES(JSON.stringify(values)));
    } else {
      localStorage.removeItem(userKey);
    }
  };

  export const getRememberUser = () => {
    const userData = localStorage.getItem(userKey);
    if (userData) {
      const _userData = JSON.parse(decryptWithAES(userData)) as LoginData;
      return _userData;
    }
    return undefined;
  };
}

export default auth;
