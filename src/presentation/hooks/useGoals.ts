import { useCallback, useEffect, useState } from "react";
import { getGoals } from "../../services/goals.service";
import { Goal } from "@/types/goal";

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getGoals();
      const mapped = data.map((goal: Goal) => ({
        id: goal.id,
        name: goal.name,
        checked: goal.checked || false,
      }));
      setGoals(mapped);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = (newGoal: Goal) => {
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals((prev) => prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
  };

  const deleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  };

  return { goals, loading, refetch: fetchGoals, addGoal, updateGoal, deleteGoal };
};
