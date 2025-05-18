import { Milestone, milestonePriority, milestoneStatus } from "@/types/milestone";
import api from "./axios";

export const getMilestones = async () => {
  const response = await api.get("/milestone");
  response.data.forEach((milestone: Milestone) => {
    milestone.priority = milestonePriority[
      milestone.priority as unknown as keyof typeof milestonePriority
    ] as Milestone["priority"];
    milestone.status = milestoneStatus[
      milestone.status as unknown as keyof typeof milestoneStatus
    ] as Milestone["status"];
  });
  console.log("Milestones:", response.data);
  return response.data;
};

export const createMilestone = async (data: Milestone) => {
  const response = await api.post("/milestone", data);
  return response.data;
};

export const callUpdateMilestone = async (id: string, data: Milestone): Promise<Milestone> => {
  const response = await api.put(`/milestone/${id}`, {
    ...data,
  });
  return response.data;
};

export const callDeleteMilestone = async (id: string) => {
  const response = await api.delete(`/milestone/${id}`);
  return response.data;
};
