import { getBusinessCaseTemplates } from "@/services/business-case.service";
import { BusinessCase } from "@/types/business-case";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TemplateBootleg = {
  id: number;
  name: string;
  createdBy: string;
};

function ManageTemplateShow({ templates }: { templates: TemplateBootleg[] }) {
  const navigate = useNavigate();
  const routeToNewTemplate = () => {
    navigate("/new-template");
  };
  // Fonctions de gestion des actions
  const handleEdit = (id: number) => {
    console.log("Édition de l'élément avec ID:", id);
    // Ajoutez votre logique d'édition ici
  };

  const handleDelete = (id: number) => {
    console.log("Suppression de l'élément avec ID:", id);
    // Ajoutez votre logique de suppression ici
  };

  // Formatage de la date pour l'affichage
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-En", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <button
          type="button"
          onClick={routeToNewTemplate}
          className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded cursor-pointer"
        >
          New Template
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Created By</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{template.name}</td>
              <td className="py-3 px-4 border-b">{template.createdBy}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(template.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//   export default ManageBusinessCases;

// Exemple d'utilisation dans un parent
function ManageTemplate() {
  const [businessCases, setBusinessCases] = useState<TemplateBootleg[]>([]);

  useEffect(() => {
    const fetchBusinessCases = async () => {
      try {
        const data = await getBusinessCaseTemplates();

        const businessCases = data.map((businessCase: BusinessCase) => ({
          id: businessCase.id,
          name: businessCase.name,
          createdBy: businessCase.createdBy,
        }));
        setBusinessCases(businessCases);
      } catch (error) {
        console.error("Error fetching business cases:", error);
      }
    };
    fetchBusinessCases();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ManageTemplateShow templates={businessCases} />
    </div>
  );
}

export default ManageTemplate;
