import { BusinessCase } from "@/types/business-case";
import api from "./axios";

export const getBusinessCases = async () => {
  const response = await api.get("/business-case");
  return response.data;
};

export const getBusinessCaseTemplates = async () => {
  const response = await api.get("/business-case/templates");
  return response.data;
};

export const callCreateBusinessCase = async (data: BusinessCase) => {
  const response = await api.post("/business-case", data);
  return response.data;
};

export const callUpdateBusinessCase = async (id: string, name: string): Promise<BusinessCase> => {
  const response = await api.put(`/business-case/${id}`, {
    name,
  });
  return response.data;
};

export const callDeleteBusinessCase = async (id: string) => {
  const response = await api.delete(`/business-case/${id}`);
  return response.data;
};
