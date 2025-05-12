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

  // États pour l'édition et la suppression
  const [editingItem, setEditingItem] = useState<{ type: string; id: string; data: any } | null>(
    null,
  );
  const [deletingItem, setDeletingItem] = useState<{
    type: string;
    id: string;
    name: string;
  } | null>(null);

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

  const handleEditCancel = () => {
    setEditingItem(null);
  };

  const handleDeleteCancel = () => {
    setDeletingItem(null);
  };

  const handleSaveDraft = async () => {};

  const handleConclude = async () => {};

  const handleDeleteConfirm = async () => {};

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

      {/* Modales pour l'édition */}
      {editingItem && editingItem.type === "milestone" && (
        <Dialog open={!!editingItem} onOpenChange={handleEditCancel}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Milestone</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  value={editingItem.data.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, description: e.target.value },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="dueDate" className="text-right text-sm font-medium">
                  Due Date
                </label>
                <Input
                  id="dueDate"
                  type="date"
                  value={editingItem.data.dueDate}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, dueDate: e.target.value },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="priority" className="text-right text-sm font-medium">
                  Priority
                </label>
                <Select
                  value={editingItem.data.priority}
                  onValueChange={(value) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, priority: value },
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right text-sm font-medium">
                  Status
                </label>
                <Select
                  value={editingItem.data.status}
                  onValueChange={(value) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, status: value },
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleEditCancel}>
                Cancel
              </Button>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingItem && editingItem.type === "cost" && (
        <Dialog open={!!editingItem} onOpenChange={handleEditCancel}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Cost</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  value={editingItem.data.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, description: e.target.value },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right text-sm font-medium">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={editingItem.data.date}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, date: e.target.value },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="period" className="text-right text-sm font-medium">
                  Period
                </label>
                <Input
                  id="period"
                  value={editingItem.data.period}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, period: e.target.value },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right text-sm font-medium">
                  Amount
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={editingItem.data.amount}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, amount: Number.parseFloat(e.target.value) || 0 },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right text-sm font-medium">
                  Type
                </label>
                <Select
                  value={editingItem.data.type}
                  onValueChange={(value) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, type: value },
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAPEX">CAPEX</SelectItem>
                    <SelectItem value="OPEX">OPEX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right text-sm font-medium">Actual Value</div>
                <div className="col-span-3">
                  <input
                    type="checkbox"
                    checked={editingItem.data.actualValue}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, actualValue: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleEditCancel}>
                Cancel
              </Button>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingItem && editingItem.type === "benefit" && (
        <Dialog open={!!editingItem} onOpenChange={handleEditCancel}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Benefit</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  value={editingItem.data.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, description: e.target.value },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right text-sm font-medium">
                  Type
                </label>
                <Select
                  value={editingItem.data.type}
                  onValueChange={(value) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, type: value },
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Qualitative">Qualitative</SelectItem>
                    <SelectItem value="Quantitative">Quantitative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right text-sm font-medium">
                  Amount
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={typeof editingItem.data.amount === "number" ? editingItem.data.amount : 0}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, amount: Number.parseFloat(e.target.value) || 0 },
                    })
                  }
                  disabled={editingItem.data.type === "Qualitative"}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right text-sm font-medium">Actual Value</div>
                <div className="col-span-3">
                  <input
                    type="checkbox"
                    checked={editingItem.data.actualValue}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, actualValue: e.target.checked },
                      })
                    }
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleEditCancel}>
                Cancel
              </Button>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingItem && editingItem.type === "risk" && (
        <Dialog open={!!editingItem} onOpenChange={handleEditCancel}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Risk</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  value={editingItem.data.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, description: e.target.value },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="impact" className="text-right text-sm font-medium">
                  Impact
                </label>
                <Select
                  value={editingItem.data.impact}
                  onValueChange={(value) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, impact: value },
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="probability" className="text-right text-sm font-medium">
                  Probability
                </label>
                <Select
                  value={editingItem.data.probability}
                  onValueChange={(value) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, probability: value },
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select probability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleEditCancel}>
                Cancel
              </Button>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirmation de suppression */}
      <Dialog open={!!deletingItem} onOpenChange={handleDeleteCancel}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingItem?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
