import { CostCenter } from "@/types/cost-center";
import api from "./axios";

export const getCostCenters = async () => {
  const response = await api.get("/cost-center");
  return response.data;
};

export const createCostCenter = async (data: CostCenter) => {
  const response = await api.post("/cost-center", data);
  return response.data;
};

export const callUpdateCostCenter = async (id: string, name: string): Promise<CostCenter> => {
  const response = await api.put(`/cost-center/${id}`, {
    name,
  });
  return response.data;
};

export const callDeleteCostCenter = async (id: string) => {
  const response = await api.delete(`/cost-center/${id}`);
  return response.data;
};
