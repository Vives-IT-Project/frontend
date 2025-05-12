import { useCallback, useEffect, useState } from "react";
import { getCostCenters } from "../../services/cost-center.service";
import { CostCenter } from "@/types/cost-center";

export const useCostCenter = () => {
  const [costCenters, setCostCenter] = useState<CostCenter[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCostCenter = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCostCenters();
      const mapped = data.map((costCenter: CostCenter) => ({
        id: costCenter.id,
        name: costCenter.name,
        checked: costCenter.checked || false,
      }));
      setCostCenter(mapped);
    } catch (error) {
      console.error("Error fetching Cost Centers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCostCenter();
  }, [fetchCostCenter]);

  const addCostCenter = (newCostCenter: CostCenter) => {
    setCostCenter((prev) => [...prev, newCostCenter]);
  };

  const updateCostCenters = (updatedCostCenter: CostCenter) => {
    setCostCenter((prev) =>
      prev.map((costCenter) =>
        costCenter.id === updatedCostCenter.id ? updatedCostCenter : costCenter,
      ),
    );
  };

  const deleteCostCenter = (costCenterId: string) => {
    setCostCenter((prev) => prev.filter((costCenter) => costCenter.id !== costCenterId));
  };

  return {
    costCenters,
    loading,
    refetch: fetchCostCenter,
    addCostCenter,
    updateCostCenters,
    deleteCostCenter,
  };
};
