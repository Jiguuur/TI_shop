import { decryptWithAES, encryptWithAES } from "utils/parse";
import http from "..";
import { Admin, LoginCustomerResponse, LoginData, LoginResponse } from "./type";
import dotenv from "dotenv"

dotenv.config();
const API_URL = "http://localhost:4000/auth"
const tokenKey = "burtgel.token";
const userKey = "app.user";
namespace auth {
  export const login = async (data: LoginData) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Login failed:", errorResponse);
      throw new Error(`Login failed: ${errorResponse.message || "Unknown error"}`);
    }

    const dataResponse = await response.json();
    console.log("Login response:", dataResponse);

    if (!dataResponse.token || !dataResponse.role_name) {
      throw new Error("Login response is not valid: Token or role_name is missing");
    }
    
    localStorage.setItem(tokenKey, dataResponse.token);
    return dataResponse;
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

  export const info = () => http.get<Admin>("/auth/info", { hasAuth: true });

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
