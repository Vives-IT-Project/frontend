export type Risk = {
  id?: string;
  description: string;
  idBusinessCase: string;
  impactLevel: "Low" | "Medium" | "High";
  probability: "Low" | "Medium" | "High";
  mitigationStrategy: string;
  checked?: boolean;
};

export const riskImpactLevels = {
  0: "Low",
  1: "Medium",
  2: "High",
};

export const riskProbabilityLevels = {
  0: "Low",
  1: "Medium",
  2: "High",
};
