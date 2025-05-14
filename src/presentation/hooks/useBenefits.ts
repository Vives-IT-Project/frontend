import { useCallback, useEffect, useState } from "react";
import { getBenefits } from "@/services/benefit.service";
import { Benefit } from "@/types/benefit";

export const useBenefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBenefits = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBenefits();
      const mapped = data.map((benefit: Benefit) => ({
        id: benefit.id,
        description: benefit.description,
        type: benefit.type,
        estimatedActual: benefit.estimatedActual,
        amount: benefit.amount,
        idOrganization: benefit.idOrganization,
        idAllocation: benefit.idAllocation,
        checked: benefit.checked || false,
        idBusinessCase: benefit.idBusinessCase,
      }));
      setBenefits(mapped);
    } catch (error) {
      console.error("Error fetching Benefits:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBenefits();
  }, [fetchBenefits]);

  const addBenefit = (newBenefit: Benefit) => {
    setBenefits((prev) => [...prev, newBenefit]);
  };

  const updateBenefits = (updatedBenefit: Benefit) => {
    setBenefits((prev) =>
      prev.map((benefit) => (benefit.id === updatedBenefit.id ? updatedBenefit : benefit)),
    );
  };

  const deleteBenefit = (benefitId: string) => {
    setBenefits((prev) => prev.filter((benefit) => benefit.id !== benefitId));
  };

  return {
    benefits,
    loading,
    refetch: fetchBenefits,
    addBenefit,
    updateBenefits,
    deleteBenefit,
  };
};
