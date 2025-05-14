export type BusinessCase = {
  id?: string;
  name: string;
  description?: string;
  idOrganization: string;
  idProject: string;
  isTemplate: boolean;
  createdBy: string;
  idTemplate?: string;
  createdAt?: string;
  goals?: string[];
  costCenters?: string[];
  evaluationTopics?: string[];
  domains?: string[];
};
