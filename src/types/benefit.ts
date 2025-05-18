export type Benefit = {
  id?: string;
  description?: string;
  type: "Qualitative" | "Quantitative";
  estimatedActual?: boolean;
  amount: number;
  idAllocation?: string;
  idBusinessCase?: string;
  checked?: boolean;
};
