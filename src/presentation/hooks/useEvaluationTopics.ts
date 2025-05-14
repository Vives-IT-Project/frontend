import { useCallback, useEffect, useState } from "react";
import { EvaluationTopic } from "@/types/evaluation-topic";
import { getEvaluationTopics } from "@/services/evaluation-topic.service";

export const useEvaluationTopics = () => {
  const [evaluationTopics, setEvaluationTopics] = useState<EvaluationTopic[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvaluationTopics = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEvaluationTopics();
      const mapped = data.map((evaluationTopic: EvaluationTopic) => ({
        id: evaluationTopic.id,
        name: evaluationTopic.name,
        description: evaluationTopic.description,
        checked: evaluationTopic.checked || false,
      }));
      setEvaluationTopics(mapped);
    } catch (error) {
      console.error("Error fetching Evaluation Topics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvaluationTopics();
  }, [fetchEvaluationTopics]);

  const addEvaluationTopic = (newEvaluationTopic: EvaluationTopic) => {
    setEvaluationTopics((prev) => [...prev, newEvaluationTopic]);
  };

  const updateEvaluationTopic = (updatedEvaluationTopic: EvaluationTopic) => {
    setEvaluationTopics((prev) =>
      prev.map((evaluationTopic) =>
        evaluationTopic.id === updatedEvaluationTopic.id ? updatedEvaluationTopic : evaluationTopic,
      ),
    );
  };

  const deleteEvaluationTopic = (evaluationTopicId: string) => {
    setEvaluationTopics((prev) =>
      prev.filter((evaluationTopic) => evaluationTopic.id !== evaluationTopicId),
    );
  };

  return {
    evaluationTopics,
    loading,
    refetch: fetchEvaluationTopics,
    addEvaluationTopic,
    updateEvaluationTopic,
    deleteEvaluationTopic,
  };
};
