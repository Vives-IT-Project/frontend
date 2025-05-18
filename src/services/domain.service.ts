import { Domain } from "@/types/domain";
import api from "./axios";

export const getDomains = async () => {
  const response = await api.get("/domain");
  return response.data;
};

export const createDomain = async (data: Domain) => {
  const response = await api.post("/domain", data);
  return response.data;
};

export const callUpdateDomain = async (id: string, name: string): Promise<Domain> => {
  const response = await api.put(`/domain/${id}`, {
    name,
  });
  return response.data;
};

export const callDeleteDomain = async (id: string) => {
  const response = await api.delete(`/domain/${id}`);
  return response.data;
};
