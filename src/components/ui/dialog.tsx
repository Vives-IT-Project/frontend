"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CollapsibleCheckboxSection } from "@/components/collapsible-checkbox-section"
import { ManageItemsModal } from "@/components/manage-items-modal"

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

  // État pour gérer l'ouverture des modales
  const [activeModal, setActiveModal] = useState<string | null>(null)

  // Handlers pour les changements de checkbox
  const handleGoalChange = (id: string, checked: boolean) => {
    setStrategicGoals(strategicGoals.map((goal) => (goal.id === id ? { ...goal, checked } : goal)))
  }

  const handleDomainChange = (id: string, checked: boolean) => {
    setDomains(domains.map((domain) => (domain.id === id ? { ...domain, checked } : domain)))
  }

  const handleCostCenterChange = (id: string, checked: boolean) => {
    setCostCenters(costCenters.map((cc) => (cc.id === id ? { ...cc, checked } : cc)))
  }

  const handleEvaluationTopicChange = (id: string, checked: boolean) => {
    setEvaluationTopics(evaluationTopics.map((topic) => (topic.id === id ? { ...topic, checked } : topic)))
  }

  // Fonctions de gestion pour chaque section
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

  // Fonction pour fermer la modale active
  const closeModal = () => {
    setActiveModal(null)
  }

  // Fonctions pour sauvegarder les modifications
  const saveGoals = (updatedItems: typeof strategicGoals) => {
    setStrategicGoals(updatedItems)
  }

  const saveDomains = (updatedItems: typeof domains) => {
    setDomains(updatedItems)
  }

  const saveCostCenters = (updatedItems: typeof costCenters) => {
    setCostCenters(updatedItems)
  }

  const saveEvaluationTopics = (updatedItems: typeof evaluationTopics) => {
    setEvaluationTopics(updatedItems)
  }

  // Soumission du formulaire
  const handleSubmit = async (isDraft: boolean) => {
    try {
      const templateData = {
        name: templateName,
        description: templateDescription,
        strategicGoals: strategicGoals.filter((g) => g.checked),
        domains: domains.filter((d) => d.checked),
        costCenters: costCenters.filter((cc) => cc.checked),
        evaluationTopics: evaluationTopics.filter((et) => et.checked),
        status: isDraft ? "draft" : "published",
      }

      console.log("Données à envoyer:", templateData)
      // await api.saveTemplate(templateData)
      alert(`Template ${isDraft ? "sauvegardé comme brouillon" : "publié"} avec succès!`)
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
          <Input id="name" className="w-full" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
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
        <Button variant="secondary" onClick={() => handleSubmit(true)}>
          Save as Draft
        </Button>
        <Button onClick={() => handleSubmit(false)}>Publish Template</Button>
      </div>

      {/* Modales pour gérer les différentes sections */}
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
    </div>
  )
}

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
