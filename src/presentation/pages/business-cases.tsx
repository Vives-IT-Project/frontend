import { useNavigate } from "react-router-dom";


function BusinessCasesShow({ businessCases }: { businessCases: Array<{ id: number; name: string; createdBy: string; createdAt: Date , statut : number}> }) {
    const navigate = useNavigate();
    const routeToManageTemplate = () => {
      navigate("/manage-templates");
    };
    const routeToNewBusinessCase = () => {
      navigate("/new-business-case");
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
            onClick={routeToNewBusinessCase}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            New Business Cases</button>
            <button
            type="button"
            onClick={routeToManageTemplate}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Manage Templates</button> </div>
         
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Created At</th>
              <th className="py-3 px-4 border-b text-left">Created By</th>
              <th className="py-3 px-4 border-b text-left">Statut</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businessCases.map((businessCase) => (
              <tr key={businessCase.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{businessCase.name}</td>
                <td className="py-3 px-4 border-b">{formatDate(businessCase.createdAt)}</td>
                <td className="py-3 px-4 border-b">{businessCase.createdBy}</td>
                <td className="py-3 px-4 border-b">
                  {businessCase.statut === 0 ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      Draft
                    </span>
                  ) : businessCase.statut === 1 ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Revision
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(businessCase.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(businessCase.id)}
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
  
function BusinessCases() {
    const businessCases = [
      {
        id: 1,
        name: "Projet Alpha",
        createdBy: "Jean Dupont",
        createdAt: new Date("2023-05-15T09:30:00"),
        statut : 1
      },
      {
        id: 2,
        name: "Projet Beta",
        createdBy: "Marie Martin",
        createdAt: new Date("2023-06-20T14:45:00"),
        statut : 0
      },
      {
        id: 3,
        name: "Projet Zera",
        createdBy: "Xavier Dupont",
        createdAt: new Date("2025-06-20T14:45:00"),
        statut : 2
      }
    ];
  
    return (
      <div className="container mx-auto p-4">
        <BusinessCasesShow businessCases={businessCases} />
      </div>
    );
  }

export default BusinessCases;