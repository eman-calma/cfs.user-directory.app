//import api from "../api/axios";
import api from "../services/api";
import type { User } from "../types/user";

export const getUsers = async () => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await api.post("/users", user);
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await api.put("/users", user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);

  return response.data;
};