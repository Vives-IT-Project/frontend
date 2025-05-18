import { Risk, riskImpactLevels, riskProbabilityLevels } from "@/types/risk";
import api from "./axios";

export const getRisks = async () => {
  const response = await api.get("/risk");
  response.data.forEach((risk: Risk) => {
    risk.impactLevel = riskImpactLevels[
      risk.impactLevel as unknown as keyof typeof riskImpactLevels
    ] as Risk["impactLevel"];
    risk.probability = riskProbabilityLevels[
      risk.probability as unknown as keyof typeof riskProbabilityLevels
    ] as Risk["probability"];
  });
  console.log("Risks:", response.data);
  return response.data;
};

export const createRisk = async (data: Risk) => {
  const response = await api.post("/risk", data);
  return response.data;
};

export const callUpdateRisk = async (id: string, data: Risk): Promise<Risk> => {
  const response = await api.put(`/risk/${id}`, {
    ...data,
  });
  return response.data;
};

export const callDeleteRisk = async (id: string) => {
  const response = await api.delete(`/risk/${id}`);
  return response.data;
};
