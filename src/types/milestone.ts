export type Milestone = {
  id?: string;
  name: string;
  description?: string;
  limitDate?: string;
  status: "Not Started" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  idBusinessCase: string;
  checked?: boolean;
};

export enum MilestonePriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  URGENT = 4,
}

export enum MilestoneStatus {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export const milestonePriority = {
  0: "Low",
  1: "Medium",
  2: "High",
  3: "Urgent",
};

export const milestoneStatus = {
  0: "Not Started",
  1: "In Progress",
  2: "Completed",
};
