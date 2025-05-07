"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CollapsibleCheckboxSection } from "../components/collapsible-checkbox-section"

export default function NewTemplate() {
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

  const handleGoalChange = (id: string, checked: boolean) => {
    setStrategicGoals(strategicGoals.map((goal) => (goal.id === id ? { ...goal, checked } : goal)))
  }

  const handleDomainChange = (id: string, checked: boolean) => {
    setDomains(domains.map((domain) => (domain.id === id ? { ...domain, checked } : domain)))
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
          <Input id="name" className="w-full" />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea id="description" className="w-full" />
        </div>

        {/* Strategic and Operational Goals */}
        <CollapsibleCheckboxSection
          title="Strategic and Operational Goals"
          items={strategicGoals}
          defaultOpen={true}
          onItemChange={handleGoalChange}
          onManage={() => alert("Manage Strategic and Operational Goals")}
        />

        {/* Domains */}
        <CollapsibleCheckboxSection
          title="Domains"
          items={domains}
          defaultOpen={true}
          onItemChange={handleDomainChange}
          onManage={() => alert("Manage Domains")}
        />

        {/* Cost Centers */}
        <CollapsibleCheckboxSection title="Cost Centers" items={[]} defaultOpen={false} />

        {/* Evaluation Topics */}
        <CollapsibleCheckboxSection title="Evaluation Topics" items={[]} defaultOpen={false} />
      </div>
    </div>
  )
}
