import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CollapsibleCheckboxSection } from "@/components/collapsible-checkbox-section";
import { ManageItemsModal } from "@/components/manage-items-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDomains } from "../hooks/useDomains";
import { createDomain, callUpdateDomain, callDeleteDomain } from "@/services/domain.service";
import { useGoals } from "../hooks/useGoals";
import { callDeleteGoal, callUpdateGoal, createGoal } from "@/services/goals.service";
import { useCostCenter } from "../hooks/useCostCenters";
import {
  callDeleteCostCenter,
  callUpdateCostCenter,
  createCostCenter,
} from "@/services/cost-center.service";
import { useEvaluationTopics } from "../hooks/useEvaluationTopics";
import {
  callDeleteEvaluationTopic,
  callUpdateEvaluationTopic,
  createEvaluationTopic,
} from "@/services/evaluation-topic.service";

interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
}

export default function CreateBusinessCaseTemplate() {
  // États pour les données du formulaire
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const idOrganization = "56336201-b466-4168-84ca-382a699cce63";

  const [strategicGoals, setStrategicGoals] = useState<CheckboxItem[]>([]);

  const [selectedDomains, setSelectedDomains] = useState<CheckboxItem[]>([]);
  const [selectedCostCenters, setSelectedCostCenters] = useState<CheckboxItem[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<CheckboxItem[]>([]);

  const { domains, addDomain, refetch, updateDomain } = useDomains();
  const { goals, addGoal, refetch: refetchGoals, updateGoal } = useGoals();

  const {
    costCenters,
    addCostCenter,
    refetch: refetchCostCenters,
    updateCostCenters,
  } = useCostCenter();

  const {
    evaluationTopics,
    addEvaluationTopic,
    refetch: refetchEvaluationTopics,
    updateEvaluationTopic,
  } = useEvaluationTopics();

  // États pour les modales
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const manageGoals = () => {
    setActiveModal("goals");
  };

  const manageDomains = () => {
    setActiveModal("domains");
  };

  const manageCostCenters = () => {
    setActiveModal("costCenters");
  };

  const manageEvaluationTopics = () => {
    setActiveModal("evaluationTopics");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // const handleGoalChange = (id: string, checked: boolean) => {
  //   setStrategicGoals(strategicGoals.map((goal) => (goal.id === id ? { ...goal, checked } : goal)));
  // };

  // const handleDomainChange = (id: string, checked: boolean) => {
  // setDomains(domains.map((domain) => (domain.id === id ? { ...domain, checked } : domain)));
  // };

  // const handleCostCenterChange = (id: string, checked: boolean) => {
  //   setCostCenters(
  //     costCenters.map((center) => (center.id === id ? { ...center, checked } : center)),
  //   );
  // };

  // const handleEvaluationTopicChange = (id: string, checked: boolean) => {
  //   setEvaluationTopics(
  //     evaluationTopics.map((topic) => (topic.id === id ? { ...topic, checked } : topic)),
  //   );
  // };

  // Handlers pour sauvegarder les modifications des modales

  const saveCostCenters = async (newCostCenter: string) => {
    const costCenter = await createCostCenter({ name: newCostCenter, idOrganization });
    addCostCenter({
      id: costCenter.id,
      name: newCostCenter,
      checked: false,
      idOrganization: costCenter.idOrganization,
    });
  };

  const updateCostCenter = async (id: string, name: string) => {
    const costCenter = await callUpdateCostCenter(id, name);
    updateCostCenters({
      id: costCenter.id,
      name: costCenter.name,
      checked: false,
      idOrganization: costCenter.idOrganization,
    });
  };

  const deleteCostCenter = async (id: string) => {
    await callDeleteCostCenter(id);
    refetchCostCenters();
  };

  const saveGoals = async (newGoal: string) => {
    const goal = await createGoal({ name: newGoal, idOrganization });
    addGoal({
      id: goal.id,
      name: newGoal,
      checked: false,
      idOrganization: goal.idOrganization,
    });
  };

  const updateGoals = async (id: string, name: string) => {
    const goal = await callUpdateGoal(id, name);
    updateGoal({
      id: goal.id,
      name: goal.name,
      checked: false,
      idOrganization: goal.idOrganization,
    });
  };

  const deleteGoal = async (id: string) => {
    console.log("Deleting goal with ID:", id);
    await callDeleteGoal(id);
    refetchGoals();
  };

  const saveDomains = async (newDomain: string) => {
    const domain = await createDomain({ name: newDomain, idOrganization });
    addDomain({
      id: domain.id,
      name: newDomain,
      checked: false,
      idOrganization: domain.idOrganization,
    });
  };

  const updateDomains = async (id: string, name: string) => {
    const domain = await callUpdateDomain(id, name);
    updateDomain({
      id: domain.id,
      name: domain.name,
      checked: false,
      idOrganization: domain.idOrganization,
    });
  };

  const deleteDomain = async (id: string) => {
    console.log("Deleting domain with ID:", id);
    await callDeleteDomain(id);
    refetch();
  };

  const saveEvaluationTopics = async (newEvaluationTopic: string) => {
    const evaluationTopic = await createEvaluationTopic({
      name: newEvaluationTopic,
      description: "Default Description", // todo: Add a description field
      idOrganization,
    });
    addEvaluationTopic({
      id: evaluationTopic.id,
      name: newEvaluationTopic,
      description: evaluationTopic.description,
      idOrganization: evaluationTopic.idOrganization,
      checked: false,
    });
  };

  const updateEvaluationTopics = async (id: string, name: string) => {
    const evaluationTopic = await callUpdateEvaluationTopic(id, name);
    updateEvaluationTopic({
      id: evaluationTopic.id,
      name: evaluationTopic.name,
      description: evaluationTopic.description,
      idOrganization: evaluationTopic.idOrganization,
      checked: false,
    });
  };

  const deleteEvaluationTopic = async (id: string) => {
    await callDeleteEvaluationTopic(id);
    refetchEvaluationTopics();
  };

  const handleSaveDraft = async () => {};

  const handleConclude = async () => {};

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <span className="text-gray-600">Business Cases</span>
          <span className="text-gray-400">/</span>
          <span>New Template</span>
        </h1>
        <Button onClick={handleSaveDraft} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Draft"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <Input
            id="name"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            className="w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Strategic and Operational Goals */}
        <CollapsibleCheckboxSection
          title="Strategic and Operational Goals"
          items={goals}
          defaultOpen={false}
          // onItemChange={handleGoalChange}
          onItemChange={() => {
            console.log("Goal changed");
          }}
          onManage={manageGoals}
        />

        {/* Domains */}
        <CollapsibleCheckboxSection
          title="Domains"
          items={domains}
          defaultOpen={false}
          // onItemChange={handleDomainChange}
          onItemChange={() => {
            console.log("Domain changed");
          }}
          onManage={manageDomains}
        />

        {/* Cost Centers */}
        <CollapsibleCheckboxSection
          title="Cost Centers"
          items={costCenters}
          defaultOpen={false}
          // onItemChange={handleCostCenterChange}
          onItemChange={() => {
            console.log("Cost Center changed");
          }}
          onManage={manageCostCenters}
        />

        {/* Evaluation Topics */}
        <CollapsibleCheckboxSection
          title="Evaluation Topics"
          items={evaluationTopics}
          defaultOpen={false}
          // onItemChange={handleEvaluationTopicChange}
          onItemChange={() => {
            console.log("Evaluation Topic changed");
          }}
          onManage={manageEvaluationTopics}
        />
      </div>

      <div className="flex justify-end mt-6 gap-3">
        <Button variant="secondary" onClick={handleSaveDraft} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Draft"}
        </Button>
        <Button onClick={handleConclude} disabled={isLoading}>
          {isLoading ? "Processing..." : "Conclude"}
        </Button>
      </div>

      {/* Modales pour gérer les différentes sections */}
      <ManageItemsModal
        title="Strategic And Operational Goals"
        items={goals}
        isOpen={activeModal === "goals"}
        onClose={closeModal}
        onSave={saveGoals}
        onDelete={deleteGoal}
        onUpdate={updateGoals}
      />

      <ManageItemsModal
        title="Domains"
        items={domains}
        isOpen={activeModal === "domains"}
        onClose={closeModal}
        onSave={saveDomains}
        onUpdate={updateDomains}
        onDelete={deleteDomain}
      />

      <ManageItemsModal
        title="Cost Centers"
        items={costCenters}
        isOpen={activeModal === "costCenters"}
        onClose={closeModal}
        onSave={saveCostCenters}
        onDelete={deleteCostCenter}
        onUpdate={updateCostCenter}
      />

      <ManageItemsModal
        title="Evaluation Topics"
        items={evaluationTopics}
        isOpen={activeModal === "evaluationTopics"}
        onClose={closeModal}
        onSave={saveEvaluationTopics}
        onDelete={deleteEvaluationTopic}
        onUpdate={updateEvaluationTopics}
      />
    </div>
  );
}
