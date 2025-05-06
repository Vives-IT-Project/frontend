import { useNavigate } from "react-router-dom";


function ManageTemplateShow({ templates }: { templates: Array<{ id: number; name: string; createdBy: string; createdAt: Date}> }) {
    const navigate = useNavigate();
    const routeToNewTemplate= () => {
      navigate("/new-template");
    }
    // Fonctions de gestion des actions
    const handleEdit = (id: number) => {
      console.log('Édition de l\'élément avec ID:', id);
      // Ajoutez votre logique d'édition ici
    };
  
    const handleDelete = (id: number) => {
      console.log('Suppression de l\'élément avec ID:', id);
      // Ajoutez votre logique de suppression ici
    };
  
    // Formatage de la date pour l'affichage
    const formatDate = (date: Date) => {
      return date.toLocaleDateString( 'en-En', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    return (
      <div className="overflow-x-auto">
        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={routeToNewTemplate}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            New Template</button>
             </div>
         
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Created At</th>
              <th className="py-3 px-4 border-b text-left">Created By</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{template.name}</td>
                <td className="py-3 px-4 border-b">{formatDate(template.createdAt)}</td>
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
    const businessCases = [
      {
        id: 1,
        name: "Template Alpha",
        createdBy: "Jean Dupont",
        createdAt: new Date("2023-05-15T09:30:00")
      },
      {
        id: 2,
        name: "Temaplte Beta",
        createdBy: "Marie Martin",
        createdAt: new Date("2023-06-20T14:45:00")
      }
    ];
  
    return (
      <div className="container mx-auto p-4">
        <ManageTemplateShow templates={businessCases} />
      </div>
    );
  }

export default ManageTemplate;