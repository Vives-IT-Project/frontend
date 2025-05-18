import { Goal } from "@/types/goal";
import api from "./axios";

export const getGoals = async () => {
  const response = await api.get("/goals");
  return response.data;
};

export const createGoal = async (data: Goal) => {
  const response = await api.post("/goals", data);
  return response.data;
};

export const callUpdateGoal = async (id: string, name: string): Promise<Goal> => {
  const response = await api.put(`/goals/${id}`, {
    name,
  });
  return response.data;
};

export const callDeleteGoal = async (id: string) => {
  const response = await api.delete(`/goals/${id}`);
  return response.data;
};
