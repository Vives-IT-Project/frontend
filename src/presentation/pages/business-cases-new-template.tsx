"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CollapsibleCheckboxSection } from "../components/collapsible-checkbox-section"

export default function NewTemplate() {
  // États initiaux pour toutes les sections
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")

  const [strategicGoals, setStrategicGoals] = useState([
    { id: "reduce-costs", label: "Reduce Operational Costs", checked: true },
    { id: "enhance-experience", label: "Enhance Customer Experience", checked: false },
    { id: "improve-efficiency", label: "Improve Efficiency & Productivity", checked: true },
    { id: "expand-market", label: "Expand Market Share", checked: true },
    { id: "ensure-compliance", label: "Ensure Regulatory Compliance", checked: false },
    { id: "accelerate-digital", label: "Accelerate Digital Transformation", checked: false },
    { id: "optimize-supply", label: "Optimize Supply Chain", checked: true },
    { id: "boost-engagement", label: "Boost Employee Engagement", checked: false },
  ])

  const [domains, setDomains] = useState([
    { id: "finance", label: "Finance & Accounting", checked: true },
    { id: "hr", label: "Human Resources", checked: false },
    { id: "it", label: "Information Technology", checked: true },
    { id: "marketing", label: "Marketing & Sales", checked: true },
    { id: "operations", label: "Operations & Logistics", checked: false },
    { id: "legal", label: "Legal & Compliance", checked: false },
    { id: "research", label: "Research & Development", checked: true },
    { id: "support", label: "Customer Support & Service", checked: false },
  ])

  const [costCenters, setCostCenters] = useState([
    { id: "cc-rd", label: "Research & Development", checked: false },
    { id: "cc-marketing", label: "Marketing", checked: true },
    { id: "cc-sales", label: "Sales", checked: false },
    { id: "cc-it", label: "Information Technology", checked: true },
  ])

  const [evaluationTopics, setEvaluationTopics] = useState([
    { id: "et-roi", label: "Return on Investment (ROI)", checked: true },
    { id: "et-risk", label: "Risk Assessment", checked: false },
    { id: "et-alignment", label: "Strategic Alignment", checked: true },
    { id: "et-feasibility", label: "Technical Feasibility", checked: false },
  ])

  // Handlers pour les changements de checkbox
  const handleGoalChange = (id: string, checked: boolean) => {
    setStrategicGoals(strategicGoals.map(goal => 
      goal.id === id ? { ...goal, checked } : goal
    ))
  }

  const handleDomainChange = (id: string, checked: boolean) => {
    setDomains(domains.map(domain => 
      domain.id === id ? { ...domain, checked } : domain
    ))
  }

  const handleCostCenterChange = (id: string, checked: boolean) => {
    setCostCenters(costCenters.map(cc => 
      cc.id === id ? { ...cc, checked } : cc
    ))
  }

  const handleEvaluationTopicChange = (id: string, checked: boolean) => {
    setEvaluationTopics(evaluationTopics.map(topic => 
      topic.id === id ? { ...topic, checked } : topic
    ))
  }

  // Fonctions de gestion pour chaque section (à connecter au backend)
  const manageGoals = async () => {
    try {
      // TODO: Implémenter l'appel API
      console.log("Gestion des objectifs stratégiques", strategicGoals)
      // await api.updateStrategicGoals(strategicGoals)
    } catch (error) {
      console.error("Erreur lors de la gestion des objectifs", error)
    }
  }

  const manageDomains = async () => {
    try {
      console.log("Gestion des domaines", domains)
      // await api.updateDomains(domains)
    } catch (error) {
      console.error("Erreur lors de la gestion des domaines", error)
    }
  }

  const manageCostCenters = async () => {
    try {
      console.log("Gestion des centres de coût", costCenters)
      // await api.updateCostCenters(costCenters)
    } catch (error) {
      console.error("Erreur lors de la gestion des centres de coût", error)
    }
  }

  const manageEvaluationTopics = async () => {
    try {
      console.log("Gestion des sujets d'évaluation", evaluationTopics)
      // await api.updateEvaluationTopics(evaluationTopics)
    } catch (error) {
      console.error("Erreur lors de la gestion des sujets d'évaluation", error)
    }
  }

  // Soumission du formulaire
  const handleSubmit = async (isDraft: boolean) => {
    try {
      const templateData = {
        name: templateName,
        description: templateDescription,
        strategicGoals: strategicGoals.filter(g => g.checked),
        domains: domains.filter(d => d.checked),
        costCenters: costCenters.filter(cc => cc.checked),
        evaluationTopics: evaluationTopics.filter(et => et.checked),
        status: isDraft ? "draft" : "published"
      }

      console.log("Données à envoyer:", templateData)
      // await api.saveTemplate(templateData)
      alert(`Template ${isDraft ? 'sauvegardé comme brouillon' : 'publié'} avec succès!`)
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error)
      alert("Une erreur est survenue lors de l'enregistrement")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <span className="text-gray-600">Business Cases</span>
          <span className="text-gray-400">/</span>
          <span>New Template</span>
        </h1>
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
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
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
            value={templateDescription}
            onChange={(e) => setTemplateDescription(e.target.value)}
          />
        </div>

        {/* Strategic and Operational Goals */}
        <CollapsibleCheckboxSection
          title="Strategic and Operational Goals"
          items={strategicGoals}
          defaultOpen={true}
          onItemChange={handleGoalChange}
          onManage={manageGoals}
        />

        {/* Domains */}
        <CollapsibleCheckboxSection
          title="Domains"
          items={domains}
          defaultOpen={true}
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
        <button 
          onClick={() => handleSubmit(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Save as Draft
        </button>
        <button 
          onClick={() => handleSubmit(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Publish Template
        </button>
      </div>
    </div>
  )
}