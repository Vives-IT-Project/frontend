import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CollapsibleCheckboxSection } from "@/components/collapsible-checkbox-section";
import { ManageItemsModal } from "@/components/manage-items-modal";
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
import { callCreateBusinessCase } from "@/services/business-case.service";
import { useNavigate } from "react-router-dom";

export default function CreateBusinessCaseTemplate() {
  // États pour les données du formulaire
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  const idOrganization = "56336201-b466-4168-84ca-382a699cce63";
  const idProject = "9add0321-a12e-4c1a-b635-6628d0206b20";
  const idUser = "2902f1f9-06c4-4982-9177-a1e00cf2a33e";

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

  const handleGoalChange = (id: string, checked: boolean) => {
    updateGoal({
      id,
      name: goals.find((goal) => goal.id === id)?.name || "",
      checked,
      idOrganization,
    });
  };

  const handleDomainChange = (id: string, checked: boolean) => {
    updateDomain({
      id,
      name: domains.find((domain) => domain.id === id)?.name || "",
      checked,
      idOrganization,
    });
  };

  const handleCostCenterChange = (id: string, checked: boolean) => {
    updateCostCenters({
      id,
      name: costCenters.find((costCenter) => costCenter.id === id)?.name || "",
      checked,
      idOrganization,
    });
  };

  const handleEvaluationTopicChange = (id: string, checked: boolean) => {
    updateEvaluationTopic({
      id,
      name: evaluationTopics.find((evaluationTopic) => evaluationTopic.id === id)?.name || "",
      description:
        evaluationTopics.find((evaluationTopic) => evaluationTopic.id === id)?.description || "",
      checked,
      idOrganization,
    });
  };

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

  const handleConclude = async () => {
    const businessCase = {
      name,
      description,
      idOrganization,
      idProject,
      isTemplate: true,
      createdBy: idUser,
      idTemplate: undefined,
      goals: goals.filter((goal) => goal.checked).map((goal) => goal.id!),
      costCenters: costCenters
        .filter((costCenter) => costCenter.checked)
        .map((costCenter) => costCenter.id!),
      evaluationTopics: evaluationTopics
        .filter((evaluationTopic) => evaluationTopic.checked)
        .map((evaluationTopic) => evaluationTopic.id!),
      domains: domains.filter((domain) => domain.checked).map((domain) => domain.id!),
    };
    console.log("Business Case Data:", businessCase);
    const newBusinessCase = await callCreateBusinessCase(businessCase);
    console.log("New Business Case Created:", newBusinessCase);

    navigate("/manage-templates");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
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
          onItemChange={handleGoalChange}
          onManage={manageGoals}
        />

        {/* Domains */}
        <CollapsibleCheckboxSection
          title="Domains"
          items={domains}
          defaultOpen={false}
          onItemChange={handleDomainChange}
          onManage={manageDomains}
        />

        {/* Cost Centers */}
        <CollapsibleCheckboxSection
          title="Cost Centers"
          items={costCenters}
          defaultOpen={false}
          onItemChange={handleCostCenterChange}
          onManage={manageCostCenters}
        />

        {/* Evaluation Topics */}
        <CollapsibleCheckboxSection
          title="Evaluation Topics"
          items={evaluationTopics}
          defaultOpen={false}
          onItemChange={handleEvaluationTopicChange}
          onManage={manageEvaluationTopics}
        />
      </div>

      <div className="flex justify-end mt-6 gap-3">
        <Button
          onClick={handleConclude}
          disabled={isLoading}
          className="bg-blue-600 text-white cursor-pointer"
        >
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
