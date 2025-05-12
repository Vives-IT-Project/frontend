import React, { useState, useEffect } from 'react';

type NoteStatus = 'N' | 'P' | 'L' | 'F';

interface Note {
  id: number;
  actor: string;
  status: NoteStatus;
  description: string;
  date: string;
}

interface AuditData {
  id: number;
  kpi: string;
  notes: Note[];
}

// Liste des acteurs dans l'ordre
const ACTORS = [
  "Service Client",
  "Manager Support",
  "Équipe Qualité",
  "Support Technique",
  "Équipe Infrastructure",
  "Manager IT",
  "RH",
  "Manager Formation",
  "Équipe Technique",
  "Consultant Externe"
];

// Fonction pour calculer la moyenne des statuts
const calculateAverageStatus = (notes: Note[]): NoteStatus => {
  const statusValues = {
    'N': 0,
    'P': 1,
    'L': 2,
    'F': 3
  };
  
  const average = notes.reduce((acc, note) => acc + statusValues[note.status], 0) / notes.length;
  
  if (average < 0.5) return 'N';
  if (average < 1.5) return 'P';
  if (average < 2.5) return 'L';
  return 'F';
};

const mockData: AuditData[] = [
  {
    id: 1,
    kpi: "Taux de satisfaction client",
    notes: [
      {
        id: 1,
        actor: "Service Client",
        status: "F",
        description: "Le taux de satisfaction client a augmenté significativement grâce à la nouvelle formation des agents. Les retours clients sont très positifs sur la qualité du service.",
        date: "2024-03-20"
      },
      {
        id: 2,
        actor: "Manager Support",
        status: "L",
        description: "La formation des nouveaux agents a été complétée avec succès. Les métriques montrent une amélioration notable dans la qualité des réponses.",
        date: "2024-03-19"
      },
      {
        id: 3,
        actor: "Équipe Qualité",
        status: "F",
        description: "Les audits qualité montrent une excellente conformité aux standards de service.",
        date: "2024-03-18"
      },
      {
        id: 4,
        actor: "Support Technique",
        status: "P",
        description: "Le support technique répond dans les délais mais pourrait améliorer la qualité des réponses.",
        date: "2024-03-20"
      },
      {
        id: 5,
        actor: "Équipe Infrastructure",
        status: "L",
        description: "L'infrastructure supporte bien la charge actuelle avec quelques optimisations possibles.",
        date: "2024-03-20"
      },
      {
        id: 6,
        actor: "Manager IT",
        status: "F",
        description: "Gestion efficace des ressources et des priorités.",
        date: "2024-03-20"
      },
      {
        id: 7,
        actor: "RH",
        status: "L",
        description: "Processus de recrutement et formation bien établis.",
        date: "2024-03-20"
      },
      {
        id: 8,
        actor: "Manager Formation",
        status: "F",
        description: "Programme de formation complet et efficace.",
        date: "2024-03-20"
      },
      {
        id: 9,
        actor: "Équipe Technique",
        status: "P",
        description: "Certaines formations techniques nécessitent une mise à jour.",
        date: "2024-03-20"
      },
      {
        id: 10,
        actor: "Consultant Externe",
        status: "L",
        description: "Apport de nouvelles perspectives et méthodologies.",
        date: "2024-03-20"
      }
    ]
  },
  {
    id: 2,
    kpi: "Temps de réponse",
    notes: [
      {
        id: 11,
        actor: "Service Client",
        status: "L",
        description: "Réponse rapide aux demandes clients.",
        date: "2024-03-20"
      },
      {
        id: 12,
        actor: "Manager Support",
        status: "F",
        description: "Supervision efficace des temps de réponse.",
        date: "2024-03-20"
      },
      {
        id: 13,
        actor: "Équipe Qualité",
        status: "P",
        description: "Certains processus de qualité ralentissent les réponses.",
        date: "2024-03-20"
      },
      {
        id: 14,
        actor: "Support Technique",
        status: "P",
        description: "Le temps de réponse moyen est supérieur à l'objectif de 1h. Une analyse des causes racines est en cours.",
        date: "2024-03-18"
      },
      {
        id: 15,
        actor: "Équipe Infrastructure",
        status: "N",
        description: "Problèmes récurrents avec le système de tickets causant des retards.",
        date: "2024-03-17"
      },
      {
        id: 16,
        actor: "Manager IT",
        status: "L",
        description: "Nouveau système de tickets en cours de déploiement pour améliorer les temps de réponse.",
        date: "2024-03-16"
      },
      {
        id: 17,
        actor: "RH",
        status: "F",
        description: "Processus de recrutement rapide et efficace.",
        date: "2024-03-20"
      },
      {
        id: 18,
        actor: "Manager Formation",
        status: "L",
        description: "Formation continue pour améliorer les temps de réponse.",
        date: "2024-03-20"
      },
      {
        id: 19,
        actor: "Équipe Technique",
        status: "P",
        description: "Certaines interventions techniques prennent trop de temps.",
        date: "2024-03-20"
      },
      {
        id: 20,
        actor: "Consultant Externe",
        status: "F",
        description: "Recommandations efficaces pour optimiser les temps de réponse.",
        date: "2024-03-20"
      }
    ]
  },
  {
    id: 3,
    kpi: "Formation des employés",
    notes: [
      {
        id: 21,
        actor: "Service Client",
        status: "F",
        description: "Formation client complète et efficace.",
        date: "2024-03-20"
      },
      {
        id: 22,
        actor: "Manager Support",
        status: "L",
        description: "Formation des managers bien structurée.",
        date: "2024-03-20"
      },
      {
        id: 23,
        actor: "Équipe Qualité",
        status: "F",
        description: "Formation qualité complète et à jour.",
        date: "2024-03-20"
      },
      {
        id: 24,
        actor: "Support Technique",
        status: "P",
        description: "Formation technique en cours de mise à jour.",
        date: "2024-03-20"
      },
      {
        id: 25,
        actor: "Équipe Infrastructure",
        status: "L",
        description: "Formation infrastructure bien adaptée aux besoins.",
        date: "2024-03-20"
      },
      {
        id: 26,
        actor: "Manager IT",
        status: "F",
        description: "Formation management IT complète.",
        date: "2024-03-20"
      },
      {
        id: 27,
        actor: "RH",
        status: "F",
        description: "100% des employés ont complété leur formation obligatoire.",
        date: "2024-03-20"
      },
      {
        id: 28,
        actor: "Manager Formation",
        status: "F",
        description: "Tous les modules de formation ont été mis à jour et validés.",
        date: "2024-03-19"
      },
      {
        id: 29,
        actor: "Équipe Technique",
        status: "L",
        description: "Formation technique en cours pour les nouvelles technologies.",
        date: "2024-03-18"
      },
      {
        id: 30,
        actor: "Consultant Externe",
        status: "P",
        description: "Certains modules nécessitent une mise à jour pour refléter les dernières pratiques.",
        date: "2024-03-17"
      }
    ]
  }
];

const getStatusColor = (status: NoteStatus) => {
  switch (status) {
    case 'N': return 'bg-red-100 text-red-800';
    case 'P': return 'bg-yellow-100 text-yellow-800';
    case 'L': return 'bg-blue-100 text-blue-800';
    case 'F': return 'bg-green-100 text-green-800';
  }
};

const getStatusLabel = (status: NoteStatus) => {
  switch (status) {
    case 'N': return 'Not Done';
    case 'P': return 'Partially';
    case 'L': return 'Largely';
    case 'F': return 'Fully';
  }
};

const AuditPage: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchDate, setSearchDate] = useState<string>('');

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      e.preventDefault();
    };

    // Empêcher le swipe horizontal sur toute la page
    document.body.style.overscrollBehavior = 'none';
    document.body.style.touchAction = 'none';

    // Ajouter les écouteurs d'événements
    document.addEventListener('touchmove', preventDefault, { passive: false });

    // Nettoyer les écouteurs d'événements
    return () => {
      document.body.style.overscrollBehavior = '';
      document.body.style.touchAction = '';
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  const filteredData = mockData.filter(item => 
    searchDate === '' || 
    item.notes.some(note => note.date === searchDate)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Page d'Audit</h1>
      
      {/* Barre de recherche par date */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <label htmlFor="dateSearch" className="text-sm font-medium text-gray-700">
            Filtrer par date :
          </label>
          <input
            type="date"
            id="dateSearch"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {searchDate && (
            <button
              onClick={() => setSearchDate('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Effacer le filtre
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="sticky left-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  KPI
                </th>
                {ACTORS.map((actor) => (
                  <th key={actor} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 min-w-[150px]">
                    {actor}
                  </th>
                ))}
                <th className="sticky right-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Moyenne
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => {
                const averageStatus = calculateAverageStatus(item.notes);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="sticky left-0 z-10 bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                      {item.kpi}
                    </td>
                    {ACTORS.map((actor) => {
                      const note = item.notes.find(n => n.actor === actor);
                      return (
                        <td key={actor} className="px-6 py-4 text-sm text-center border border-gray-200">
                          {note ? (
                            <div 
                              className="inline-flex flex-col items-center cursor-pointer hover:opacity-80"
                              onClick={() => setSelectedNote(note)}
                            >
                              <span className={`px-3 py-1.5 rounded text-base font-medium ${getStatusColor(note.status)}`}>
                                {note.status}
                              </span>
                              <span className="text-xs text-gray-500 mt-1">
                                {note.date}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="sticky right-0 z-10 bg-white px-6 py-4 whitespace-nowrap text-sm text-center border border-gray-200">
                      <div className="inline-flex items-center">
                        <span className={`px-3 py-1.5 rounded text-base font-medium ${getStatusColor(averageStatus)}`}>
                          {averageStatus}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal pour afficher la description */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-lg font-semibold text-gray-600 mb-2">
                  {selectedNote.date}
                </div>
                <h3 className="text-xl font-bold">{selectedNote.actor}</h3>
                <div className="mt-1 flex items-center">
                  <span className={`px-3 py-1.5 rounded text-base font-medium ${getStatusColor(selectedNote.status)}`}>
                    {selectedNote.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Description détaillée:</h4>
              <div className="text-gray-600">
                {selectedNote.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditPage; 