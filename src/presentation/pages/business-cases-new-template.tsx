"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Check, X, Edit, Trash2, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CollapsibleCheckboxSection } from "@/components/collapsible-checkbox-section"
import { ManageItemsModal } from "@/components/manage-items-modal"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types
interface Template {
  id: string
  name: string
}

interface Actor {
  id: string
  name: string
  checked: boolean
}

interface Milestone {
  id: string
  description: string
  dueDate: string
  priority: "Low" | "Medium" | "High" | "Urgent"
  status: "Not Started" | "In Progress" | "Completed"
  checked: boolean
}

interface Cost {
  id: string
  description: string
  date: string
  period: string
  amount: number
  type: "CAPEX" | "OPEX"
  actualValue: boolean
  checked: boolean
}

interface Benefit {
  id: string
  description: string
  amount: number | string
  type: "Qualitative" | "Quantitative"
  actualValue: boolean
  checked: boolean
}

interface Risk {
  id: string
  description: string
  impact: "Low" | "Medium" | "High"
  probability: "Low" | "Medium" | "High"
  checked: boolean
}

interface CheckboxItem {
  id: string
  label: string
  checked: boolean
}

// API service for backend operations
const apiService = {
  // Get all templates
  async getTemplates(): Promise<Template[]> {
    try {
      // const response = await fetch('/api/templates');
      // if (!response.ok) throw new Error('Failed to fetch templates');
      // return await response.json();

      // Simlulation of data for development
      return [
        { id: "small-it", name: "Small IT Business Case" },
        { id: "large-it", name: "Large IT Business Case" },
        { id: "small-hr", name: "Small HR Business Case" },
        { id: "large-admin", name: "Large Administrative Business Case" },
      ]
    } catch (error) {
      console.error("Error fetching templates:", error)
      throw error
    }
  },

  // Fetch template details
  async getTemplateDetails(templateId: string): Promise<any> {
    try {
      // const response = await fetch(`/api/templates/${templateId}`);
      // if (!response.ok) throw new Error('Failed to fetch template details');
      // return await response.json();

      // Data simulation for development
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
      }
    } catch (error) {
      console.error(`Error fetching template details for ${templateId}:`, error)
      throw error
    }
  },

  // Save a new business case
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

      // Smulation of response for development
      return { id: "bc-" + Date.now(), ...data, status }
    } catch (error) {
      console.error("Error saving business case:", error)
      throw error
    }
  },

  // Update an existing business case
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

      // Simulation of response for development
      return { id, ...data, updatedAt: new Date().toISOString() }
    } catch (error) {
      console.error(`Error updating business case ${id}:`, error)
      throw error
    }
  },
}

export default function CreateBusinessCase() {
  // state for the selected template
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // State for the selection
  const [templates, setTemplates] = useState<Template[]>([])

  const [actors, setActors] = useState<Actor[]>([
    { id: "john-doe", name: "John Doe", checked: true },
    { id: "eleanor-rigby", name: "Eleanor Rigby", checked: false },
    { id: "father-mckenzie", name: "Father McKenzie", checked: true },
    { id: "atom-squad", name: "Atom Squad", checked: true },
    { id: "city-hall", name: "City Hall", checked: false },
    { id: "omega-squad", name: "Omega Squad", checked: false },
  ])

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "project-kickoff",
      description: "Project Kickoff",
      dueDate: "10/10/2025",
      priority: "Low",
      status: "Not Started",
      checked: true,
    },
    {
      id: "requirements",
      description: "Requirements Finalization",
      dueDate: "10/10/2025",
      priority: "Medium",
      status: "Not Started",
      checked: false,
    },
    {
      id: "prototype",
      description: "Prototype Development",
      dueDate: "10/15/2025",
      priority: "Urgent",
      status: "Not Started",
      checked: true,
    },
    {
      id: "testing",
      description: "Testing & Validation",
      dueDate: "10/18/2025",
      priority: "High",
      status: "Not Started",
      checked: false,
    },
    {
      id: "training",
      description: "User Training & Onboarding",
      dueDate: "10/20/2025",
      priority: "Low",
      status: "Not Started",
      checked: false,
    },
    {
      id: "go-live",
      description: "Go-Live Date",
      dueDate: "10/30/2025",
      priority: "Low",
      status: "Not Started",
      checked: true,
    },
  ])

  const [costs, setCosts] = useState<Cost[]>([
    {
      id: "cloud-infra",
      description: "Purchase of cloud infrastructure",
      date: "10/10/2025",
      period: "Q2 2025",
      amount: 15000,
      type: "CAPEX",
      actualValue: true,
      checked: true,
    },
    {
      id: "crm-subscription",
      description: "Monthly CRM system subscription",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 250,
      type: "OPEX",
      actualValue: false,
      checked: false,
    },
    {
      id: "developer-salaries",
      description: "Developer salaries",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 18000,
      type: "OPEX",
      actualValue: true,
      checked: true,
    },
    {
      id: "hardware-upgrade",
      description: "Hardware upgrade for data processing",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 22000,
      type: "CAPEX",
      actualValue: false,
      checked: false,
    },
    {
      id: "cloud-storage",
      description: "Cloud storage fees",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 560,
      type: "OPEX",
      actualValue: false,
      checked: false,
    },
    {
      id: "software-dev",
      description: "Custom software development",
      date: "10/10/2025",
      period: "Q3 2025",
      amount: 35000,
      type: "CAPEX",
      actualValue: true,
      checked: true,
    },
  ])

  const [benefits, setBenefits] = useState<Benefit[]>([
    {
      id: "time-savings",
      description: "Time savings by automating manual data entry",
      amount: 0,
      type: "Qualitative",
      actualValue: true,
      checked: true,
    },
    {
      id: "new-market",
      description: "New market penetration increasing yearly sales",
      amount: 120000,
      type: "Quantitative",
      actualValue: false,
      checked: false,
    },
    {
      id: "partner-collab",
      description: "Improved partner collaboration through shared platform",
      amount: 0,
      type: "Qualitative",
      actualValue: true,
      checked: true,
    },
    {
      id: "revenue-increase",
      description: "Increased monthly revenue from new customer acquisition",
      amount: 50000,
      type: "Quantitative",
      actualValue: false,
      checked: false,
    },
    {
      id: "cost-reduction",
      description: "Reduction in operational costs through automation",
      amount: 15000,
      type: "Quantitative",
      actualValue: true,
      checked: true,
    },
    {
      id: "satisfaction",
      description: "Improved customer satisfaction due to faster response times",
      amount: 0,
      type: "Qualitative",
      actualValue: true,
      checked: true,
    },
  ])

  const [risks, setRisks] = useState<Risk[]>([
    {
      id: "api-integration",
      description: "Delay in third-party API integration",
      impact: "High",
      probability: "Medium",
      checked: true,
    },
    {
      id: "turnover",
      description: "Key team member turnover during project execution",
      impact: "Medium",
      probability: "Medium",
      checked: true,
    },
    {
      id: "budget-overrun",
      description: "Budget overrun due to underestimation of cloud costs",
      impact: "High",
      probability: "High",
      checked: true,
    },
    {
      id: "adoption",
      description: "End-user adoption is lower than expected",
      impact: "High",
      probability: "Medium",
      checked: true,
    },
    {
      id: "legacy-systems",
      description: "Integration conflict with existing legacy systems",
      impact: "Low",
      probability: "Low",
      checked: true,
    },
    {
      id: "compliance",
      description: "Regulatory compliance requirements change mid-project",
      impact: "Medium",
      probability: "Low",
      checked: true,
    },
  ])

  const [strategicGoals, setStrategicGoals] = useState<CheckboxItem[]>([
    { id: "reduce-costs", label: "Reduce Operational Costs", checked: true },
    { id: "enhance-experience", label: "Enhance Customer Experience", checked: false },
    { id: "improve-efficiency", label: "Improve Efficiency & Productivity", checked: true },
    { id: "expand-market", label: "Expand Market Share", checked: true },
    { id: "ensure-compliance", label: "Ensure Regulatory Compliance", checked: false },
    { id: "accelerate-digital", label: "Accelerate Digital Transformation", checked: false },
    { id: "optimize-supply", label: "Optimize Supply Chain", checked: true },
    { id: "boost-engagement", label: "Boost Employee Engagement", checked: false },
  ])

  const [domains, setDomains] = useState<CheckboxItem[]>([
    { id: "finance", label: "Finance & Accounting", checked: true },
    { id: "hr", label: "Human Resources", checked: false },
    { id: "it", label: "Information Technology", checked: true },
    { id: "marketing", label: "Marketing & Sales", checked: true },
    { id: "operations", label: "Operations & Logistics", checked: false },
    { id: "legal", label: "Legal & Compliance", checked: false },
    { id: "research", label: "Research & Development", checked: true },
    { id: "support", label: "Customer Support & Service", checked: false },
  ])

  const [costCenters, setCostCenters] = useState<CheckboxItem[]>([
    { id: "cc-rd", label: "Research & Development", checked: true },
    { id: "cc-marketing", label: "Marketing", checked: false },
    { id: "cc-sales", label: "Sales", checked: true },
    { id: "cc-it", label: "Information Technology", checked: false },
    { id: "cc-hr", label: "Human Resources", checked: true },
    { id: "cc-finance", label: "Finance", checked: false },
  ])

  const [evaluationTopics, setEvaluationTopics] = useState<CheckboxItem[]>([
    { id: "et-roi", label: "Return on Investment (ROI)", checked: true },
    { id: "et-risk", label: "Risk Assessment", checked: false },
    { id: "et-alignment", label: "Strategic Alignment", checked: true },
    { id: "et-feasibility", label: "Technical Feasibility", checked: false },
    { id: "et-sustainability", label: "Sustainability", checked: true },
    { id: "et-compliance", label: "Regulatory Compliance", checked: false },
  ])

  // State for the modal
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isTemplateOpen, setIsTemplateOpen] = useState(false)
  const [isActorsOpen, setIsActorsOpen] = useState(false)

  // State for editing and deleting items
  const [editingItem, setEditingItem] = useState<{ type: string; id: string; data: any } | null>(null)
  const [deletingItem, setDeletingItem] = useState<{ type: string; id: string; name: string } | null>(null)

  // State for adding new items
  const [isAddingMilestone, setIsAddingMilestone] = useState(false)
  const [isAddingCost, setIsAddingCost] = useState(false)
  const [isAddingBenefit, setIsAddingBenefit] = useState(false)
  const [isAddingRisk, setIsAddingRisk] = useState(false)

  // State for new items
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Not Started",
    checked: true,
  })

  const [newCost, setNewCost] = useState<Partial<Cost>>({
    description: "",
    date: "",
    period: "",
    amount: 0,
    type: "CAPEX",
    actualValue: false,
    checked: true,
  })

  const [newBenefit, setNewBenefit] = useState<Partial<Benefit>>({
    description: "",
    amount: 0,
    type: "Quantitative",
    actualValue: false,
    checked: true,
  })

  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    description: "",
    impact: "Medium",
    probability: "Medium",
    checked: true,
  })

  // Load templates on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templatesData = await apiService.getTemplates()
        setTemplates(templatesData)
      } catch (error) {
        console.error("Failed to load templates:", error)
        // Gérer l'erreur (afficher un message, etc.)
      }
    }

    fetchTemplates()
  }, [])

  // Load template data when a template is selected
  useEffect(() => {
    if (selectedTemplate) {
      const loadTemplateData = async () => {
        setIsLoading(true)
        try {
          const templateData = await apiService.getTemplateDetails(selectedTemplate)

          // update state with template data
          // Note: Dans un cas réel, vous adapteriez ces assignations selon la structure de votre API
          if (templateData.name) setName(templateData.name)
          if (templateData.description) setDescription(templateData.description)
          if (templateData.actors) setActors(templateData.actors)
          if (templateData.milestones) setMilestones(templateData.milestones)
          if (templateData.costs) setCosts(templateData.costs)
          if (templateData.benefits) setBenefits(templateData.benefits)
          if (templateData.risks) setRisks(templateData.risks)
          if (templateData.strategicGoals) setStrategicGoals(templateData.strategicGoals)
          if (templateData.domains) setDomains(templateData.domains)
          if (templateData.costCenters) setCostCenters(templateData.costCenters)
          if (templateData.evaluationTopics) setEvaluationTopics(templateData.evaluationTopics)
        } catch (error) {
          console.error(`Error loading template data for ${selectedTemplate}:`, error)
          // Gérer l'erreur (afficher un message, etc.)
        } finally {
          setIsLoading(false)
        }
      }

      loadTemplateData()
    }
  }, [selectedTemplate])

  // Handlers for the modales
  const manageActors = () => {
    setActiveModal("actors")
  }

  const manageGoals = () => {
    setActiveModal("goals")
  }

  const manageDomains = () => {
    setActiveModal("domains")
  }

  const manageCostCenters = () => {
    setActiveModal("costCenters")
  }

  const manageEvaluationTopics = () => {
    setActiveModal("evaluationTopics")
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  // Handlers for the checkbox changes
  const handleActorChange = (id: string, checked: boolean) => {
    setActors(actors.map((actor) => (actor.id === id ? { ...actor, checked } : actor)))
  }

  const handleGoalChange = (id: string, checked: boolean) => {
    setStrategicGoals(strategicGoals.map((goal) => (goal.id === id ? { ...goal, checked } : goal)))
  }

  const handleDomainChange = (id: string, checked: boolean) => {
    setDomains(domains.map((domain) => (domain.id === id ? { ...domain, checked } : domain)))
  }

  const handleCostCenterChange = (id: string, checked: boolean) => {
    setCostCenters(costCenters.map((center) => (center.id === id ? { ...center, checked } : center)))
  }

  const handleEvaluationTopicChange = (id: string, checked: boolean) => {
    setEvaluationTopics(evaluationTopics.map((topic) => (topic.id === id ? { ...topic, checked } : topic)))
  }

  // Handlers for saving changes
  const saveActors = (updatedItems: CheckboxItem[]) => {
    setActors(updatedItems.map((item) => ({ id: item.id, name: item.label, checked: item.checked })))
  }

  const saveGoals = (updatedItems: CheckboxItem[]) => {
    setStrategicGoals(updatedItems)
  }

  const saveDomains = (updatedItems: CheckboxItem[]) => {
    setDomains(updatedItems)
  }

  const saveCostCenters = (updatedItems: CheckboxItem[]) => {
    setCostCenters(updatedItems)
  }

  const saveEvaluationTopics = (updatedItems: CheckboxItem[]) => {
    setEvaluationTopics(updatedItems)
  }

  // Handlers for edition
  const handleEditClick = (type: string, id: string, data: any) => {
    setEditingItem({ type, id, data })
  }

  const handleEditSave = () => {
    if (!editingItem) return

    const { type, id, data } = editingItem

    switch (type) {
      case "milestone":
        setMilestones(milestones.map((m) => (m.id === id ? { ...data, id } : m)))
        break
      case "cost":
        setCosts(costs.map((c) => (c.id === id ? { ...data, id } : c)))
        break
      case "benefit":
        setBenefits(benefits.map((b) => (b.id === id ? { ...data, id } : b)))
        break
      case "risk":
        setRisks(risks.map((r) => (r.id === id ? { ...data, id } : r)))
        break
    }

    setEditingItem(null)
  }

  const handleEditCancel = () => {
    setEditingItem(null)
  }

  // Handlers for deletion
  const handleDeleteClick = (type: string, id: string, name: string) => {
    setDeletingItem({ type, id, name })
  }

  const handleDeleteConfirm = () => {
    if (!deletingItem) return

    const { type, id } = deletingItem

    switch (type) {
      case "milestone":
        setMilestones(milestones.filter((m) => m.id !== id))
        break
      case "cost":
        setCosts(costs.filter((c) => c.id !== id))
        break
      case "benefit":
        setBenefits(benefits.filter((b) => b.id !== id))
        break
      case "risk":
        setRisks(risks.filter((r) => r.id !== id))
        break
    }

    setDeletingItem(null)
  }

  const handleDeleteCancel = () => {
    setDeletingItem(null)
  }

  // Handlers for adding new items
  const handleAddMilestone = () => {
    if (!newMilestone.description || !newMilestone.dueDate) return

    const id = `milestone-${Date.now()}`
    const milestone: Milestone = {
      id,
      description: newMilestone.description || "",
      dueDate: newMilestone.dueDate || "",
      priority: (newMilestone.priority as "Low" | "Medium" | "High" | "Urgent") || "Medium",
      status: (newMilestone.status as "Not Started" | "In Progress" | "Completed") || "Not Started",
      checked: newMilestone.checked || true,
    }

    setMilestones([...milestones, milestone])
    setNewMilestone({
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "Not Started",
      checked: true,
    })
    setIsAddingMilestone(false)
  }

  const handleAddCost = () => {
    if (!newCost.description || !newCost.date || !newCost.period || newCost.amount === undefined) return

    const id = `cost-${Date.now()}`
    const cost: Cost = {
      id,
      description: newCost.description || "",
      date: newCost.date || "",
      period: newCost.period || "",
      amount: newCost.amount || 0,
      type: (newCost.type as "CAPEX" | "OPEX") || "CAPEX",
      actualValue: newCost.actualValue || false,
      checked: newCost.checked || true,
    }

    setCosts([...costs, cost])
    setNewCost({
      description: "",
      date: "",
      period: "",
      amount: 0,
      type: "CAPEX",
      actualValue: false,
      checked: true,
    })
    setIsAddingCost(false)
  }

  const handleAddBenefit = () => {
    if (!newBenefit.description) return

    const id = `benefit-${Date.now()}`
    const benefit: Benefit = {
      id,
      description: newBenefit.description || "",
      amount: newBenefit.amount || 0,
      type: (newBenefit.type as "Qualitative" | "Quantitative") || "Quantitative",
      actualValue: newBenefit.actualValue || false,
      checked: newBenefit.checked || true,
    }

    setBenefits([...benefits, benefit])
    setNewBenefit({
      description: "",
      amount: 0,
      type: "Quantitative",
      actualValue: false,
      checked: true,
    })
    setIsAddingBenefit(false)
  }

  const handleAddRisk = () => {
    if (!newRisk.description) return

    const id = `risk-${Date.now()}`
    const risk: Risk = {
      id,
      description: newRisk.description || "",
      impact: (newRisk.impact as "Low" | "Medium" | "High") || "Medium",
      probability: (newRisk.probability as "Low" | "Medium" | "High") || "Medium",
      checked: newRisk.checked || true,
    }

    setRisks([...risks, risk])
    setNewRisk({
      description: "",
      impact: "Medium",
      probability: "Medium",
      checked: true,
    })
    setIsAddingRisk(false)
  }

  // Prepare data for submission
  const prepareBusinessCaseData = () => {
    return {
      name,
      description,
      templateId: selectedTemplate,
      actors: actors.filter((a) => a.checked).map(({ id, name }) => ({ id, name })),
      milestones: milestones.filter((m) => m.checked),
      costs: costs.filter((c) => c.checked),
      benefits: benefits.filter((b) => b.checked),
      risks: risks.filter((r) => r.checked),
      strategicGoals: strategicGoals.filter((g) => g.checked),
      domains: domains.filter((d) => d.checked),
      costCenters: costCenters.filter((c) => c.checked),
      evaluationTopics: evaluationTopics.filter((e) => e.checked),
    }
  }

  // Save draft or conclude
  const handleSaveDraft = async () => {
    setIsLoading(true)
    try {
      const businessCaseData = prepareBusinessCaseData()
      const result = await apiService.saveBusinessCase(businessCaseData, "draft")
      console.log("Business case draft saved:", result)
      alert("Business case draft saved successfully!")
    } catch (error) {
      console.error("Error saving business case draft:", error)
      alert("An error occurred while saving the business case draft")
    } finally {
      setIsLoading(false)
    }
  }

  const handleConclude = async () => {
    setIsLoading(true)
    try {
      const businessCaseData = prepareBusinessCaseData()
      const result = await apiService.saveBusinessCase(businessCaseData, "concluded")
      console.log("Business case concluded:", result)
      alert("Business case concluded successfully!")
    } catch (error) {
      console.error("Error concluding business case:", error)
      alert("An error occurred while concluding the business case")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <span className="text-gray-600">Business Cases</span>
          <span className="text-gray-400">/</span>
          <span>Create New</span>
        </h1>
        <Button onClick={handleSaveDraft} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Draft"}
        </Button>
      </div>

      <div className="space-y-6">
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
              <RadioGroup value={selectedTemplate || ""} onValueChange={setSelectedTemplate} className="p-2 space-y-2">
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={template.id} id={template.id} />
                    <label htmlFor={template.id} className="text-sm">
                      {template.name}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <Input id="name" className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
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
                  e.stopPropagation()
                  manageActors()
                }}
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
                      onChange={(e) => handleActorChange(actor.id, e.target.checked)}
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
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                    placeholder="Enter milestone description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <Input
                    type="date"
                    value={newMilestone.dueDate}
                    onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <Select
                    value={newMilestone.priority}
                    onValueChange={(value) => setNewMilestone({ ...newMilestone, priority: value as any })}
                  >
                    <SelectTrigger>
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
                    onValueChange={(value) => setNewMilestone({ ...newMilestone, status: value as any })}
                  >
                    <SelectTrigger>
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
                <Button variant="outline" size="sm" onClick={() => setIsAddingMilestone(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddMilestone}>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{milestone.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{milestone.dueDate}</td>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{milestone.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={milestone.checked}
                          onChange={(e) => {
                            setMilestones(
                              milestones.map((m) => (m.id === milestone.id ? { ...m, checked: e.target.checked } : m)),
                            )
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick("milestone", milestone.id, milestone)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick("milestone", milestone.id, milestone.description)}
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
                    onChange={(e) => setNewCost({ ...newCost, amount: Number.parseFloat(e.target.value) || 0 })}
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
                      checked={newCost.actualValue}
                      onChange={(e) => setNewCost({ ...newCost, actualValue: e.target.checked })}
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
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{cost.description}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{cost.date}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{cost.period}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cost.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{cost.type}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cost.actualValue ? (
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
                            setCosts(costs.map((c) => (c.id === cost.id ? { ...c, checked: e.target.checked } : c)))
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick("cost", cost.id, cost)}>
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
                    onChange={(e) => setNewBenefit({ ...newBenefit, amount: Number.parseFloat(e.target.value) || 0 })}
                    disabled={newBenefit.type === "Qualitative"}
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newBenefit.actualValue}
                      onChange={(e) => setNewBenefit({ ...newBenefit, actualValue: e.target.checked })}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{benefit.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {typeof benefit.amount === "number" && benefit.amount > 0
                        ? benefit.amount.toLocaleString()
                        : "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{benefit.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {benefit.actualValue ? (
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
                            setBenefits(
                              benefits.map((b) => (b.id === benefit.id ? { ...b, checked: e.target.checked } : b)),
                            )
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick("benefit", benefit.id, benefit)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick("benefit", benefit.id, benefit.description)}
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
                <div>
                  <label className="block text-sm font-medium mb-1">Impact</label>
                  <Select
                    value={newRisk.impact}
                    onValueChange={(value) => setNewRisk({ ...newRisk, impact: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact" />
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{risk.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          risk.impact === "Low"
                            ? "bg-green-100 text-green-800"
                            : risk.impact === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {risk.impact}
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
                            setRisks(risks.map((r) => (r.id === risk.id ? { ...r, checked: e.target.checked } : r)))
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick("risk", risk.id, risk)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick("risk", risk.id, risk.description)}
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

        {/* Strategic and Operational Goals */}
        <CollapsibleCheckboxSection
          title="Strategic and Operational Goals"
          items={strategicGoals}
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
        <Button variant="secondary" onClick={handleSaveDraft} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Draft"}
        </Button>
        <Button onClick={handleConclude} disabled={isLoading}>
          {isLoading ? "Processing..." : "Conclude"}
        </Button>
      </div>

      {/* Modales pour gérer les différentes sections */}
      <ManageItemsModal
        title="Actors"
        items={actors.map((a) => ({ id: a.id, label: a.name, checked: a.checked }))}
        isOpen={activeModal === "actors"}
        onClose={closeModal}
        onSave={(items) => saveActors(items)}
      />

      <ManageItemsModal
        title="Strategic And Operational Goals"
        items={strategicGoals}
        isOpen={activeModal === "goals"}
        onClose={closeModal}
        onSave={saveGoals}
      />

      <ManageItemsModal
        title="Domains"
        items={domains}
        isOpen={activeModal === "domains"}
        onClose={closeModal}
        onSave={saveDomains}
      />

      <ManageItemsModal
        title="Cost Centers"
        items={costCenters}
        isOpen={activeModal === "costCenters"}
        onClose={closeModal}
        onSave={saveCostCenters}
      />

      <ManageItemsModal
        title="Evaluation Topics"
        items={evaluationTopics}
        isOpen={activeModal === "evaluationTopics"}
        onClose={closeModal}
        onSave={saveEvaluationTopics}
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
  )
}
