import { getRisks } from "@/services/risk.service";
import { Risk } from "@/types/risk";
import { useCallback, useEffect, useState } from "react";

export const useRisks = () => {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRisks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRisks();
      const mapped = data.map((risk: Risk) => ({
        id: risk.id,
        description: risk.description,
        idBusinessCase: risk.idBusinessCase,
        impactLevel: risk.impactLevel,
        probability: risk.probability,
        mitigationStrategy: risk.mitigationStrategy,
        checked: risk.checked || false,
      }));
      setRisks(mapped);
    } catch (error) {
      console.error("Error fetching Risks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRisks();
  }, [fetchRisks]);

  const addRisk = (newRisk: Risk) => {
    setRisks((prev) => [...prev, newRisk]);
  };

  const updateRisks = (updatedRisk: Risk) => {
    setRisks((prev) => prev.map((risk) => (risk.id === updatedRisk.id ? updatedRisk : risk)));
  };

  const deleteRisk = (riskId: string) => {
    setRisks((prev) => prev.filter((risk) => risk.id !== riskId));
  };

  return {
    risks,
    loading,
    refetch: fetchRisks,
    addRisk,
    updateRisks,
    deleteRisk,
  };
};
