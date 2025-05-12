import { EvaluationTopic } from "@/types/evaluation-topic";
import api from "./axios";

export const getEvaluationTopics = async () => {
  const response = await api.get("/evaluation-topics");
  return response.data;
};

export const createEvaluationTopic = async (data: EvaluationTopic) => {
  const response = await api.post("/evaluation-topics", data);
  return response.data;
};

export const callUpdateEvaluationTopic = async (
  id: string,
  name: string,
): Promise<EvaluationTopic> => {
  const response = await api.put(`/evaluation-topics/${id}`, {
    name,
  });
  return response.data;
};

export const callDeleteEvaluationTopic = async (id: string) => {
  const response = await api.delete(`/evaluation-topics/${id}`);
  return response.data;
};
