import client from "./client";
import type { AuthResponse, User } from "../types";

// 로그인
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await client.post<AuthResponse>("/auth/login", { email, password });
  // 토쥰 저장
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// 회원가입
export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await client.post<AuthResponse>("/auth/register", { name, email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// 프로필 조회
export const getProfile = async (): Promise<User> => {
  const response = await client.get<User>("/auth/profile");
  return response.data;
};
