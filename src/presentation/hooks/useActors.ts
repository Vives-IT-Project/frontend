import { useCallback, useEffect, useState } from "react";
import { getActors } from "../../services/actor.service";
import { Actor } from "@/types/actor";

export const useActors = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActors = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getActors();
      const mapped = data.map((actor: Actor) => ({
        id: actor.id,
        name: actor.name,
        checked: actor.checked || false,
      }));
      setActors(mapped);
    } catch (error) {
      console.error("Error fetching Actors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActors();
  }, [fetchActors]);

  const addActor = (newActor: Actor) => {
    setActors((prev) => [...prev, newActor]);
  };

  const updateActors = (updatedActor: Actor) => {
    setActors((prev) => prev.map((actor) => (actor.id === updatedActor.id ? updatedActor : actor)));
  };

  const deleteActor = (actorId: string) => {
    setActors((prev) => prev.filter((actor) => actor.id !== actorId));
  };

  return { actors, loading, refetch: fetchActors, addActor, updateActors, deleteActor };
};
