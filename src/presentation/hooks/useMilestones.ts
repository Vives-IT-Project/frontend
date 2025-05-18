import { useCallback, useEffect, useState } from "react";
import { getMilestones } from "@/services/milestone.service";
import { Milestone } from "@/types/milestone";

export const useMilestones = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMilestones = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMilestones();
      const mapped = data.map((milestone: Milestone) => ({
        id: milestone.id,
        name: milestone.name,
        checked: milestone.checked || false,
        description: milestone.description,
        limitDate: new Date(milestone.limitDate!).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        status: milestone.status,
        priority: milestone.priority,
        idBusinessCase: milestone.idBusinessCase,
      }));
      setMilestones(mapped);
    } catch (error) {
      console.error("Error fetching Milestones:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMilestones();
  }, [fetchMilestones]);

  const addMilestone = (newMilestone: Milestone) => {
    setMilestones((prev) => [...prev, newMilestone]);
  };

  const updateMilestones = (updatedMilestone: Milestone) => {
    setMilestones((prev) =>
      prev.map((milestone) =>
        milestone.id === updatedMilestone.id ? updatedMilestone : milestone,
      ),
    );
  };

  const deleteMilestone = (milestoneId: string) => {
    setMilestones((prev) => prev.filter((milestone) => milestone.id !== milestoneId));
  };

  return {
    milestones,
    loading,
    refetch: fetchMilestones,
    addMilestone,
    updateMilestones,
    deleteMilestone,
  };
};
