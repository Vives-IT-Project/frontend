import { Actor } from "@/types/actor";
import api from "./axios";

export const getActors = async () => {
  const response = await api.get("/actor");
  return response.data;
};

export const createActor = async (data: Actor) => {
  const response = await api.post("/actor", data);
  return response.data;
};

export const callUpdateActor = async (id: string, name: string): Promise<Actor> => {
  const response = await api.put(`/actor/${id}`, {
    name,
  });
  return response.data;
};

export const callDeleteActor = async (id: string) => {
  const response = await api.delete(`/actor/${id}`);
  return response.data;
};
