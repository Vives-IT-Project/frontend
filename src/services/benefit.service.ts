import { Benefit } from "@/types/benefit";
import api from "./axios";

export const getBenefits = async () => {
  const response = await api.get("/benefit");
  return response.data;
};

export const createBenefit = async (data: Benefit) => {
  const response = await api.post("/benefit", data);
  return response.data;
};

export const callUpdateBenefit = async (id: string, data: Benefit): Promise<Benefit> => {
  const response = await api.put(`/benefit/${id}`, {
    ...data,
  });
  return response.data;
};

export const callDeleteBenefit = async (id: string) => {
  const response = await api.delete(`/benefit/${id}`);
  return response.data;
};
