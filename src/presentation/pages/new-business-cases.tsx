import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Edit,
  Trash2,
  AlertTriangle,
  CircleArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CheckboxItem,
  CollapsibleCheckboxSection,
} from "@/components/collapsible-checkbox-section";
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
import {
  callCreateBusinessCase,
  callDeleteBusinessCase,
  getBusinessCaseTemplates,
  getTemplateData,
} from "@/services/business-case.service";
import { BusinessCase } from "@/types/business-case";
import { useNavigate } from "react-router-dom";
import { Goal } from "@/types/goal";
import { Domain } from "@/types/domain";
import { ManageItemsModal } from "@/components/manage-items-modal";
import { useActors } from "../hooks/useActors";
import { callDeleteActor, callUpdateActor, createActor } from "@/services/actor.service";
import { Milestone } from "@/types/milestone";
import {
  callDeleteMilestone,
  callUpdateMilestone,
  createMilestone,
} from "@/services/milestone.service";
import { useMilestones } from "../hooks/useMilestones";
import { useRisks } from "../hooks/useRisks";
import { callDeleteRisk, callUpdateRisk, createRisk } from "@/services/risk.service";
import { Risk } from "@/types/risk";
import { Benefit } from "@/types/benefit";
import { useBenefits } from "../hooks/useBenefits";
import { callDeleteBenefit, callUpdateBenefit, createBenefit } from "@/services/benefit.service";

// Types
interface Template {
  id: string;
  name: string;
}

interface Cost {
  id: string;
  description: string;
  date: string;
  period: string;
  amount: number;
  type: "CAPEX" | "OPEX";
  estimatedActual: boolean;
  checked: boolean;
}

// API service pour les appels backend
const apiService = {
  // Récupérer les templates disponibles
  async getTemplates(): Promise<Template[]> {
    try {
      // const response = await fetch('/api/templates');
      // if (!response.ok) throw new Error('Failed to fetch templates');
      // return await response.json();

      // Simulation de données pour le développement
      return [
        { id: "small-it", name: "Small IT Business Case" },
        { id: "large-it", name: "Large IT Business Case" },
        { id: "small-hr", name: "Small HR Business Case" },
        { id: "large-admin", name: "Large Administrative Business Case" },
      ];
    } catch (error) {
      console.error("Error fetching templates:", error);
      throw error;
    }
  },

  // Récupérer les détails d'un template spécifique
  async getTemplateDetails(templateId: string): Promise<any> {
    try {
      // const response = await fetch(`/api/templates/${templateId}`);
      // if (!response.ok) throw new Error('Failed to fetch template details');
      // return await response.json();

      // Simulation de données pour le développement
      return {
        name: `Template ${templateId}`,
        description: "Template description",
        actors: [],
        milestones: [],
        costs: [],
        benefits: [],
        risks: [],
        strategicGoals: [],
        domains: [],
        costCenters: [],
        evaluationTopics: [],
      };
    } catch (error) {
      console.error(`Error fetching template details for ${templateId}:`, error);
      throw error;
    }
  },

  // Sauvegarder un business case (brouillon ou final)
  async saveBusinessCase(data: any, status: "draft" | "concluded"): Promise<any> {
    try {
      // const response = await fetch('/api/business-cases', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ ...data, status }),
      // });
      // if (!response.ok) throw new Error('Failed to save business case');
      // return await response.json();

      // Simulation de réponse pour le développement
      return { id: "bc-" + Date.now(), ...data, status };
    } catch (error) {
      console.error("Error saving business case:", error);
      throw error;
    }
  },

  // Mettre à jour un business case existant
  async updateBusinessCase(id: string, data: any): Promise<any> {
    try {
      // const response = await fetch(`/api/business-cases/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) throw new Error('Failed to update business case');
      // return await response.json();

      // Simulation de réponse pour le développement
      return { id, ...data, updatedAt: new Date().toISOString() };
    } catch (error) {
      console.error(`Error updating business case ${id}:`, error);
      throw error;
    }
  },
};

export default function CreateBusinessCase() {
  // États pour les données du formulaire
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const idOrganization = "56336201-b466-4168-84ca-382a699cce63";
  const idProject = "9add0321-a12e-4c1a-b635-6628d0206b20";
  const idUser = "2902f1f9-06c4-4982-9177-a1e00cf2a33e";

  const { actors, addActor, refetch: refetchActors, updateActors } = useActors();

  // États pour les sections
  const [templates, setTemplates] = useState<BusinessCase[]>([]);

  // const [actors, setActors] = useState<Actor[]>([]);

  const [costs, setCosts] = useState<Cost[]>([
    {
      id: "cloud-infra",
      description: "Purchase of cloud infrastructure",
      date: "10/10/2025",
      period: "Q2 2025",
      amount: 15000,
      type: "CAPEX",
      estimatedActual: true,
      checked: true,
    },
    {
      id: "crm-subscription",
      description: "Monthly CRM system subscription",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 250,
      type: "OPEX",
      estimatedActual: false,
      checked: false,
    },
    {
      id: "developer-salaries",
      description: "Developer salaries",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 18000,
      type: "OPEX",
      estimatedActual: true,
      checked: true,
    },
    {
      id: "hardware-upgrade",
      description: "Hardware upgrade for data processing",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 22000,
      type: "CAPEX",
      estimatedActual: false,
      checked: false,
    },
    {
      id: "cloud-storage",
      description: "Cloud storage fees",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 560,
      type: "OPEX",
      estimatedActual: false,
      checked: false,
    },
    {
      id: "software-dev",
      description: "Custom software development",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 35000,
      type: "CAPEX",
      estimatedActual: true,
      checked: true,
    },
  ]);

  const [strategicGoals, setStrategicGoals] = useState<CheckboxItem[]>([]);

  const [domains, setDomains] = useState<CheckboxItem[]>([
    { id: "finance", label: "Finance & Accounting", checked: true },
    { id: "hr", label: "Human Resources", checked: false },
    { id: "it", label: "Information Technology", checked: true },
    { id: "marketing", label: "Marketing & Sales", checked: true },
    { id: "operations", label: "Operations & Logistics", checked: false },
    { id: "legal", label: "Legal & Compliance", checked: false },
    { id: "research", label: "Research & Development", checked: true },
    { id: "support", label: "Customer Support & Service", checked: false },
  ]);

  const [costCenters, setCostCenters] = useState<CheckboxItem[]>([
    { id: "cc-rd", label: "Research & Development", checked: true },
    { id: "cc-marketing", label: "Marketing", checked: false },
    { id: "cc-sales", label: "Sales", checked: true },
    { id: "cc-it", label: "Information Technology", checked: false },
    { id: "cc-hr", label: "Human Resources", checked: true },
    { id: "cc-finance", label: "Finance", checked: false },
  ]);

  const [evaluationTopics, setEvaluationTopics] = useState<CheckboxItem[]>([
    { id: "et-roi", label: "Return on Investment (ROI)", checked: true },
    { id: "et-risk", label: "Risk Assessment", checked: false },
    { id: "et-alignment", label: "Strategic Alignment", checked: true },
    { id: "et-feasibility", label: "Technical Feasibility", checked: false },
    { id: "et-sustainability", label: "Sustainability", checked: true },
    { id: "et-compliance", label: "Regulatory Compliance", checked: false },
  ]);

  // États pour les modales
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isActorsOpen, setIsActorsOpen] = useState(false);

  // États pour l'édition et la suppression
  const [editingItem, setEditingItem] = useState<{ type: string; id: string; data: any } | null>(
    null,
  );
  const [deletingItem, setDeletingItem] = useState<{
    type: string;
    id: string;
    name: string;
  } | null>(null);

  // États pour l'ajout de nouveaux éléments
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [isAddingCost, setIsAddingCost] = useState(false);
  const [isAddingBenefit, setIsAddingBenefit] = useState(false);
  const [isAddingRisk, setIsAddingRisk] = useState(false);

  // Nouveaux éléments temporaires
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    description: "",
    limitDate: "",
    priority: "Medium",
    status: "Not Started",
    checked: true,
  });

  const [newCost, setNewCost] = useState<Partial<Cost>>({
    description: "",
    date: "",
    period: "",
    amount: 0,
    type: "CAPEX",
    estimatedActual: false,
    checked: true,
  });

  const [newBenefit, setNewBenefit] = useState<Partial<Benefit>>({
    description: "",
    amount: 0,
    type: "Quantitative",
    estimatedActual: false,
    checked: true,
  });

  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    description: "",
    impactLevel: "Medium",
    probability: "Medium",
    checked: true,
    mitigationStrategy: "",
  });

  // Charger les templates au chargement de la page
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templatesData = await getBusinessCaseTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error("Failed to load templates:", error);
        // Gérer l'erreur (afficher un message, etc.)
      }
    };

    fetchTemplates();
  }, []);

  // Handlers pour les modales
  const manageActors = () => {
    setActiveModal("actors");
  };

  // Handlers pour les changements
  const handleActorChange = (id: string, checked: boolean) => {
    setActors(actors.map((actor) => (actor.id === id ? { ...actor, checked } : actor)));
  };

  const handleGoalChange = (id: string, checked: boolean) => {
    setStrategicGoals(strategicGoals.map((goal) => (goal.id === id ? { ...goal, checked } : goal)));
  };

  const handleDomainChange = (id: string, checked: boolean) => {
    setDomains(domains.map((domain) => (domain.id === id ? { ...domain, checked } : domain)));
  };

  const handleCostCenterChange = (id: string, checked: boolean) => {
    setCostCenters(
      costCenters.map((center) => (center.id === id ? { ...center, checked } : center)),
    );
  };

  const handleEvaluationTopicChange = (id: string, checked: boolean) => {
    setEvaluationTopics(
      evaluationTopics.map((topic) => (topic.id === id ? { ...topic, checked } : topic)),
    );
  };

  // Handlers pour l'édition
  const handleEditClick = (type: string, id: string, data: any) => {
    console.log("Editing item:", type, id, data);
    setEditingItem({ type, id, data });
  };

  const handleEditSave = async () => {
    if (!editingItem) return;

    const { type, id, data } = editingItem;

    switch (type) {
      case "milestone": {
        try {
          data.limitDate = new Date(data.limitDate).toISOString();
          delete data.checked;
          await callUpdateMilestone(id, data);
          refetchMilestones();
        } catch (error) {
          console.error("Error updating milestone:", error);
        } finally {
          setEditingItem(null);
        }
        break;
      }
      case "cost":
        setCosts(costs.map((c) => (c.id === id ? { ...data, id } : c)));
        break;
      case "benefit":
        try {
          delete data.checked;
          data.idBusinessCase = idBusinessCase.current;
          await callUpdateBenefit(id, data);
          refetchBenefits();
        } catch (error) {
          console.error("Error updating benefit:", error);
        } finally {
          setEditingItem(null);
        }
        break;
      case "risk":
        {
          try {
            delete data.checked;
            data.idBusinessCase = idBusinessCase.current;
            await callUpdateRisk(id, data);
            refetchRisks();
          } catch (error) {
            console.error("Error updating risk:", error);
          } finally {
            setEditingItem(null);
          }
        }
        break;
    }

    setEditingItem(null);
  };

  const handleEditCancel = () => {
    setEditingItem(null);
  };

  // Handlers pour la suppression
  const handleDeleteClick = (type: string, id: string, name: string) => {
    setDeletingItem({ type, id, name });
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;

    const { type, id } = deletingItem;

    switch (type) {
      case "milestone":
        await callDeleteMilestone(id);
        refetchMilestones();
        break;
      case "cost":
        setCosts(costs.filter((c) => c.id !== id));
        break;
      case "benefit":
        await callDeleteBenefit(id);
        refetchBenefits();
        break;
      case "risk":
        await callDeleteRisk(id);
        refetchRisks();
        break;
    }

    setDeletingItem(null);
  };

  const handleDeleteCancel = () => {
    setDeletingItem(null);
  };

  const { milestones, updateMilestones, refetch: refetchMilestones } = useMilestones();

  // Handlers pour l'ajout
  const handleAddMilestone = async () => {
    if (
      !newMilestone.name ||
      !newMilestone.description ||
      !newMilestone.limitDate ||
      !newMilestone.status ||
      !newMilestone.priority
    )
      return;

    const milestone: Milestone = {
      description: newMilestone.description,
      limitDate: new Date(newMilestone.limitDate).toISOString(),
      priority: newMilestone.priority,
      status: newMilestone.status,
      idBusinessCase: idBusinessCase.current,
      name: newMilestone.name,
    };

    await createMilestone(milestone);
    refetchMilestones();

    setNewMilestone({
      description: "",
      limitDate: "",
      priority: "Medium",
      status: "Not Started",
      checked: true,
    });
    setIsAddingMilestone(false);
  };

  const handleAddCost = () => {
    if (!newCost.description || !newCost.date || !newCost.period || newCost.amount === undefined)
      return;

    const id = `cost-${Date.now()}`;
    const cost: Cost = {
      id,
      description: newCost.description || "",
      date: newCost.date || "",
      period: newCost.period || "",
      amount: newCost.amount || 0,
      type: (newCost.type as "CAPEX" | "OPEX") || "CAPEX",
      estimatedActual: newCost.estimatedActual || false,
      checked: newCost.checked || true,
    };

    setCosts([...costs, cost]);
    setNewCost({
      description: "",
      date: "",
      period: "",
      amount: 0,
      type: "CAPEX",
      estimatedActual: false,
      checked: true,
    });
    setIsAddingCost(false);
  };

  const { benefits, refetch: refetchBenefits, updateBenefits } = useBenefits();

  const handleAddBenefit = async () => {
    if (
      !newBenefit.description ||
      !newBenefit.amount ||
      !newBenefit.type ||
      !newBenefit.estimatedActual ||
      !idBusinessCase.current
    )
      return;

    const benefit: Benefit = {
      amount: newBenefit.amount,
      description: newBenefit.description,
      type: newBenefit.type,
      estimatedActual: newBenefit.estimatedActual,
      idBusinessCase: idBusinessCase.current,
      idAllocation: "a91ae45d-e06e-4475-b366-cda877735833",
    };

    await createBenefit(benefit);
    refetchBenefits();

    setNewBenefit({
      description: "",
      amount: 0,
      type: "Quantitative",
      estimatedActual: false,
      checked: true,
    });
    setIsAddingBenefit(false);
  };

  const { risks, refetch: refetchRisks, updateRisks } = useRisks();

  const handleAddRisk = async () => {
    if (
      !newRisk.description ||
      !newRisk.impactLevel ||
      !newRisk.probability ||
      !newRisk.mitigationStrategy
    )
      return;

    const risk = {
      description: newRisk.description || "",
      impactLevel: newRisk.impactLevel,
      probability: newRisk.probability,
      idBusinessCase: idBusinessCase.current,
      mitigationStrategy: newRisk.mitigationStrategy,
    };

    await createRisk(risk);
    refetchRisks();

    setNewRisk({
      description: "",
      impactLevel: "Medium",
      probability: "Medium",
      checked: true,
      mitigationStrategy: "",
    });
    setIsAddingRisk(false);
  };

  const isTemporary = useRef<boolean>(true);
  const idBusinessCase = useRef<string>("");
  const creationCalled = useRef<boolean>(false);

  const handleConclude = async () => {
    isTemporary.current = false;
  };

  /**
   * Creates a new Business Case when the page is loaded.
   * Deletes the Business Case if the user navigates away.
   */
  useEffect(() => {
    const createBusinessCase = async () => {
      setIsLoading(true);
      try {
        const businessCase = {
          name: "TEMP",
          description: "TEMP",
          idOrganization,
          idProject,
          isTemplate: false,
          createdBy: idUser,
          idTemplate: "186f29e2-fc13-49e0-b1c2-55dd3e0d623b",
          goals: [],
          costCenters: [],
          evaluationTopics: [],
          domains: [],
        };
        const newBusinessCase = await callCreateBusinessCase(businessCase);
        // setIdBusinessCase(newBusinessCase.id);
        idBusinessCase.current = newBusinessCase.id;
        console.log("Business case created:", newBusinessCase);
      } catch (error) {
        console.error("Error creating business case:", error);
      }
    };
    if (!idBusinessCase.current && !creationCalled.current) {
      creationCalled.current = true;
      createBusinessCase();
    }
    return () => {
      // Delete the business case if the user navigates away
      const deleteBusinessCase = async () => {
        await callDeleteBusinessCase(idBusinessCase.current);
      };
      if (isTemporary.current) {
        deleteBusinessCase();
      }
    };
  }, []);

  /**
   * Loads the template data when a template is selected.
   */
  useEffect(() => {
    const fetchTemplateData = async () => {
      if (!selectedTemplate) return;
      const template = await getTemplateData(selectedTemplate);
      console.log("Template data:", template);
      setStrategicGoals(
        template.Goal.map((goal: Goal) => ({
          id: goal.id,
          name: goal.name,
          checked: false,
        })),
      );
      setDomains(
        template.Domain.map((domain: Domain) => ({
          id: domain.id,
          name: domain.name,
          checked: false,
        })),
      );

      setCostCenters(
        template.CostCenter.map((costCenter: Domain) => ({
          id: costCenter.id,
          name: costCenter.name,
          checked: false,
        })),
      );

      setEvaluationTopics(
        template.EvaluationTopic.map((topic: Domain) => ({
          id: topic.id,
          name: topic.name,
          checked: false,
        })),
      );
    };
    fetchTemplateData();
  }, [selectedTemplate]);

  const saveActor = async (newActor: string) => {
    const actor = await createActor({ name: newActor, idOrganization, type: 1 });
    addActor({
      id: actor.id,
      name: actor.name,
      checked: false,
      idOrganization: actor.idOrganization,
      type: actor.type,
    });
  };

  const updateActor = async (id: string, name: string) => {
    const updatedActor = await callUpdateActor(id, name);
    updateActors({
      id: updatedActor.id,
      name: updatedActor.name,
      checked: false,
      idOrganization: updatedActor.idOrganization,
      type: updatedActor.type,
    });
  };

  const deleteActor = async (id: string) => {
    await callDeleteActor(id);
    refetchActors();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="space-y-6">
        <div className="flex justify-start mb-4 gap-4">
          <button
            type="button"
            onClick={() => navigate("/business-cases")}
            className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-2 rounded cursor-pointer"
          >
            <CircleArrowLeft />
          </button>
        </div>

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

        {/* Template Selection */}
        <div className="relative">
          <div
            className="border rounded-md p-3 flex justify-between items-center cursor-pointer"
            onClick={() => setIsTemplateOpen(!isTemplateOpen)}
          >
            <span className="font-medium">Template</span>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              {isTemplateOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>
          </div>

          {isTemplateOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
              <RadioGroup
                value={selectedTemplate || ""}
                onValueChange={setSelectedTemplate}
                className="p-2 space-y-2"
              >
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={template.id!} id={template.id} />
                    <label htmlFor={template.id} className="text-sm">
                      {template.name}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        {selectedTemplate ? (
          <div className="space-y-4">
            {/* Strategic and Operational Goals */}
            <CollapsibleCheckboxSection
              title="Strategic and Operational Goals"
              items={strategicGoals}
              defaultOpen={false}
              onItemChange={handleGoalChange}
            />

            {/* Domains */}
            <CollapsibleCheckboxSection
              title="Domains"
              items={domains}
              defaultOpen={false}
              onItemChange={handleDomainChange}
            />

            {/* Cost Centers */}
            <CollapsibleCheckboxSection
              title="Cost Centers"
              items={costCenters}
              defaultOpen={false}
              onItemChange={handleCostCenterChange}
            />

            {/* Evaluation Topics */}
            <CollapsibleCheckboxSection
              title="Evaluation Topics"
              items={evaluationTopics}
              defaultOpen={false}
              onItemChange={handleEvaluationTopicChange}
            />
          </div>
        ) : (
          <div>
            <p className="ml-4 mt-8 mb-10 text-gray-800">Please select a template</p>
          </div>
        )}

        {/* Actors Section */}
        <div className="relative">
          <div
            className="border rounded-md p-3 flex justify-between items-center cursor-pointer"
            onClick={() => setIsActorsOpen(!isActorsOpen)}
          >
            <span className="font-medium">Actors</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  manageActors();
                }}
                className="cursor-pointer"
              >
                Manage
              </Button>
              <Button variant="ghost" size="sm" className="p-1 h-auto">
                {isActorsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </div>
          </div>

          {isActorsOpen && (
            <div className="p-4 pt-0 border-t border-x border-b rounded-b-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {actors.map((actor) => (
                  <div key={actor.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={actor.id}
                      checked={actor.checked}
                      onChange={(e) => handleActorChange(actor.id!, e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={actor.id} className="text-sm">
                      {actor.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Milestones Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">Milestones</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsAddingMilestone(true)}>
                Add
              </Button>
            </div>
          </div>

          {isAddingMilestone && (
            <div className="mb-4 p-4 border rounded-md bg-gray-50">
              <h3 className="text-sm font-medium mb-3">Add New Milestone</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={newMilestone.name}
                    onChange={(e) => setNewMilestone({ ...newMilestone, name: e.target.value })}
                    placeholder="Enter milestone name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={newMilestone.description}
                    onChange={(e) =>
                      setNewMilestone({ ...newMilestone, description: e.target.value })
                    }
                    placeholder="Enter milestone description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <Input
                    type="date"
                    value={newMilestone.limitDate}
                    onChange={(e) =>
                      setNewMilestone({ ...newMilestone, limitDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <Select
                    value={newMilestone.priority}
                    onValueChange={(value) =>
                      setNewMilestone({ ...newMilestone, priority: value as any })
                    }
                  >
                    <SelectTrigger className="cursor-pointer">
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
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select
                    value={newMilestone.status}
                    onValueChange={(value) =>
                      setNewMilestone({ ...newMilestone, status: value as any })
                    }
                  >
                    <SelectTrigger className="cursor-pointer">
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
              <div className="flex justify-end gap-2">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingMilestone(false)}
                >
                  Cancel
                </Button>
                <Button className="cursor-pointer" size="sm" onClick={handleAddMilestone}>
                  Add Milestone
                </Button>
              </div>
            </div>
          )}

          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {milestones.map((milestone) => (
                  <tr key={milestone.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {milestone.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {milestone.limitDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          milestone.priority === "Low"
                            ? "bg-green-100 text-green-800"
                            : milestone.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : milestone.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {milestone.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {milestone.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={milestone.checked}
                          onChange={(e) => {
                            const updatedMilestone = milestones.filter(
                              (m) => m.id === milestone.id,
                            )[0];
                            updatedMilestone.checked = e.target.checked;
                            updateMilestones(updatedMilestone);
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick("milestone", milestone.id!, milestone)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleDeleteClick("milestone", milestone.id!, milestone.description!)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Costs Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">Costs</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsAddingCost(true)}>
                Add
              </Button>
            </div>
          </div>

          {isAddingCost && (
            <div className="mb-4 p-4 border rounded-md bg-gray-50">
              <h3 className="text-sm font-medium mb-3">Add New Cost</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={newCost.description}
                    onChange={(e) => setNewCost({ ...newCost, description: e.target.value })}
                    placeholder="Enter cost description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input
                    type="date"
                    value={newCost.date}
                    onChange={(e) => setNewCost({ ...newCost, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Period</label>
                  <Input
                    value={newCost.period}
                    onChange={(e) => setNewCost({ ...newCost, period: e.target.value })}
                    placeholder="e.g. Q2 2025"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <Input
                    type="number"
                    value={newCost.amount?.toString()}
                    onChange={(e) =>
                      setNewCost({ ...newCost, amount: Number.parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select
                    value={newCost.type}
                    onValueChange={(value) => setNewCost({ ...newCost, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CAPEX">CAPEX</SelectItem>
                      <SelectItem value="OPEX">OPEX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newCost.estimatedActual}
                      onChange={(e) =>
                        setNewCost({ ...newCost, estimatedActual: e.target.checked })
                      }
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Actual Value</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsAddingCost(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddCost}>
                  Add Cost
                </Button>
              </div>
            </div>
          )}

          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Period
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actual Value?
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {costs.map((cost) => (
                  <tr key={cost.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cost.description}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cost.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cost.period}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cost.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cost.type}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cost.estimatedActual ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={cost.checked}
                          onChange={(e) => {
                            setCosts(
                              costs.map((c) =>
                                c.id === cost.id ? { ...c, checked: e.target.checked } : c,
                              ),
                            );
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick("cost", cost.id, cost)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick("cost", cost.id, cost.description)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">Benefits</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsAddingBenefit(true)}>
                Add
              </Button>
            </div>
          </div>

          {isAddingBenefit && (
            <div className="mb-4 p-4 border rounded-md bg-gray-50">
              <h3 className="text-sm font-medium mb-3">Add New Benefit</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={newBenefit.description}
                    onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                    placeholder="Enter benefit description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select
                    value={newBenefit.type}
                    onValueChange={(value) => setNewBenefit({ ...newBenefit, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Qualitative">Qualitative</SelectItem>
                      <SelectItem value="Quantitative">Quantitative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <Input
                    type="number"
                    value={newBenefit.amount?.toString()}
                    onChange={(e) =>
                      setNewBenefit({
                        ...newBenefit,
                        amount: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    disabled={newBenefit.type === "Qualitative"}
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newBenefit.estimatedActual}
                      onChange={(e) =>
                        setNewBenefit({ ...newBenefit, estimatedActual: e.target.checked })
                      }
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Actual Value</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsAddingBenefit(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddBenefit}>
                  Add Benefit
                </Button>
              </div>
            </div>
          )}

          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actual Value?
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {benefits.map((benefit) => (
                  <tr key={benefit.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {benefit.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {typeof benefit.amount === "number" && benefit.amount > 0
                        ? benefit.amount.toLocaleString()
                        : "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {benefit.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {benefit.estimatedActual ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={benefit.checked}
                          onChange={(e) => {
                            const updatedBenefit = benefits.filter((r) => r.id === benefit!.id)[0];
                            updatedBenefit.checked = e.target.checked;
                            updateBenefits(updatedBenefit);
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick("benefit", benefit.id!, benefit)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleDeleteClick("benefit", benefit.id!, benefit.description!)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk and Complexity Factors */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">Risk and Complexity Factors</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsAddingRisk(true)}>
                Add
              </Button>
            </div>
          </div>

          {isAddingRisk && (
            <div className="mb-4 p-4 border rounded-md bg-gray-50">
              <h3 className="text-sm font-medium mb-3">Add New Risk</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={newRisk.description}
                    onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                    placeholder="Enter risk description"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Mitigation Strategy</label>
                  <Input
                    value={newRisk.mitigationStrategy}
                    onChange={(e) => setNewRisk({ ...newRisk, mitigationStrategy: e.target.value })}
                    placeholder="Enter mitigation strategy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Impact</label>
                  <Select
                    value={newRisk.impactLevel}
                    onValueChange={(value) => setNewRisk({ ...newRisk, impactLevel: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select impactLevel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Probability</label>
                  <Select
                    value={newRisk.probability}
                    onValueChange={(value) => setNewRisk({ ...newRisk, probability: value as any })}
                  >
                    <SelectTrigger>
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
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsAddingRisk(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddRisk}>
                  Add Risk
                </Button>
              </div>
            </div>
          )}

          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Impact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Probability
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {risks.map((risk) => (
                  <tr key={risk.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {risk.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          risk.impactLevel === "Low"
                            ? "bg-green-100 text-green-800"
                            : risk.impactLevel === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {risk.impactLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          risk.probability === "Low"
                            ? "bg-green-100 text-green-800"
                            : risk.probability === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {risk.probability}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={risk.checked}
                          onChange={(e) => {
                            const updatedRisk = risks.filter((r) => r.id === risk.id)[0];
                            updatedRisk.checked = e.target.checked;
                            updateRisks(updatedRisk);
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick("risk", risk.id!, risk)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick("risk", risk.id!, risk.description)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-3">
        <Button onClick={handleConclude} disabled={isLoading}>
          {isLoading ? "Processing..." : "Conclude"}
        </Button>
      </div>

      <ManageItemsModal
        title="Actors"
        items={actors}
        isOpen={activeModal === "actors"}
        onClose={() => setActiveModal(null)}
        onSave={saveActor}
        onUpdate={updateActor}
        onDelete={deleteActor}
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
                <label htmlFor="limitDate" className="text-right text-sm font-medium">
                  Due Date
                </label>
                <Input
                  required
                  id="limitDate"
                  type="date"
                  value={editingItem.data.limitDate}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, limitDate: e.target.value },
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
                    checked={editingItem.data.estimatedActual}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, estimatedActual: e.target.checked },
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
                    checked={editingItem.data.estimatedActual}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, estimatedActual: e.target.checked },
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
                <label htmlFor="impactLevel" className="text-right text-sm font-medium">
                  Impact
                </label>
                <Select
                  value={editingItem.data.impactLevel}
                  onValueChange={(value) =>
                    setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, impactLevel: value },
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select impactLevel" />
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
