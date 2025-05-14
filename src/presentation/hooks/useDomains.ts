import { useCallback, useEffect, useState } from "react";
import { getDomains } from "../../services/domain.service";
import { Domain } from "@/types/domain";

export const useDomains = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDomains = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDomains();
      const mapped = data.map((domain: Domain) => ({
        id: domain.id,
        name: domain.name,
        checked: domain.checked || false,
      }));
      setDomains(mapped);
    } catch (error) {
      console.error("Error fetching domains:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const addDomain = (newDomain: Domain) => {
    setDomains((prev) => [...prev, newDomain]);
  };

  const updateDomain = (updatedDomain: Domain) => {
    setDomains((prev) =>
      prev.map((domain) => (domain.id === updatedDomain.id ? updatedDomain : domain)),
    );
  };

  const deleteDomain = (domainId: string) => {
    setDomains((prev) => prev.filter((domain) => domain.id !== domainId));
  };

  return { domains, loading, refetch: fetchDomains, addDomain, updateDomain, deleteDomain };
};
