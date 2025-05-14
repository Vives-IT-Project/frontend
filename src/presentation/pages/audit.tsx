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
  "Customer Service",
  "Support Manager",
  "Quality Team",
  "Technical Support",
  "Infrastructure Team",
  "IT Manager",
  "HR",
  "Training Manager",
  "Technical Team",
  "External Consultant"
];

// Liste des business cases
const BUSINESS_CASES = [
  "Customer Service Optimization",
  "Digital Transformation",
  "Quality Improvement"
];

// Données mockées pour chaque business case
const mockDataByBusinessCase: Record<string, AuditData[]> = {
  "Customer Service Optimization": [
    {
      id: 1,
      kpi: "Customer Satisfaction Rate",
      notes: [
        {
          id: 1,
          actor: "Customer Service",
          status: "F",
          description: "Customer satisfaction has significantly increased thanks to the new agent training. Customer feedback is very positive about service quality.",
          date: "2024-03-20"
        },
        {
          id: 2,
          actor: "Support Manager",
          status: "L",
          description: "New agent training has been successfully completed. Metrics show notable improvement in response quality.",
          date: "2024-03-19"
        },
        {
          id: 3,
          actor: "Quality Team",
          status: "F",
          description: "Quality audits show excellent compliance with service standards.",
          date: "2024-03-18"
        },
        {
          id: 4,
          actor: "Technical Support",
          status: "P",
          description: "Technical support responds within deadlines but could improve response quality.",
          date: "2024-03-20"
        },
        {
          id: 5,
          actor: "Infrastructure Team",
          status: "L",
          description: "Infrastructure supports current load well with some possible optimizations.",
          date: "2024-03-20"
        },
        {
          id: 6,
          actor: "IT Manager",
          status: "F",
          description: "Efficient resource and priority management.",
          date: "2024-03-20"
        },
        {
          id: 7,
          actor: "HR",
          status: "L",
          description: "Well-established recruitment and training processes.",
          date: "2024-03-20"
        },
        {
          id: 8,
          actor: "Training Manager",
          status: "F",
          description: "Complete and effective training program.",
          date: "2024-03-20"
        },
        {
          id: 9,
          actor: "Technical Team",
          status: "P",
          description: "Some technical training needs updating.",
          date: "2024-03-20"
        },
        {
          id: 10,
          actor: "External Consultant",
          status: "L",
          description: "Bringing new perspectives and methodologies.",
          date: "2024-03-20"
        }
      ]
    },
    {
      id: 2,
      kpi: "Average Response Time",
      notes: [
        {
          id: 11,
          actor: "Customer Service",
          status: "L",
          description: "Quick response to customer requests.",
          date: "2024-03-20"
        },
        {
          id: 12,
          actor: "Support Manager",
          status: "F",
          description: "Effective response time supervision.",
          date: "2024-03-20"
        },
        {
          id: 13,
          actor: "Quality Team",
          status: "P",
          description: "Some quality processes slow down responses.",
          date: "2024-03-20"
        },
        {
          id: 14,
          actor: "Technical Support",
          status: "P",
          description: "Average response time is above the 1-hour target. Root cause analysis is ongoing.",
          date: "2024-03-18"
        },
        {
          id: 15,
          actor: "Infrastructure Team",
          status: "N",
          description: "Recurring issues with the ticket system causing delays.",
          date: "2024-03-17"
        },
        {
          id: 16,
          actor: "IT Manager",
          status: "L",
          description: "New ticket system being deployed to improve response times.",
          date: "2024-03-16"
        },
        {
          id: 17,
          actor: "HR",
          status: "F",
          description: "Fast and efficient recruitment process.",
          date: "2024-03-20"
        },
        {
          id: 18,
          actor: "Training Manager",
          status: "L",
          description: "Ongoing training to improve response times.",
          date: "2024-03-20"
        },
        {
          id: 19,
          actor: "Technical Team",
          status: "P",
          description: "Some technical interventions take too long.",
          date: "2024-03-20"
        },
        {
          id: 20,
          actor: "External Consultant",
          status: "F",
          description: "Effective recommendations to optimize response times.",
          date: "2024-03-20"
        }
      ]
    },
    {
      id: 3,
      kpi: "First Contact Resolution Rate",
      notes: [
        {
          id: 21,
          actor: "Customer Service",
          status: "F",
          description: "Complete training on first contact resolution.",
          date: "2024-03-20"
        },
        {
          id: 22,
          actor: "Support Manager",
          status: "L",
          description: "Implementation of new quick resolution procedures.",
          date: "2024-03-20"
        },
        {
          id: 23,
          actor: "Quality Team",
          status: "F",
          description: "Quality audit of first contact resolutions.",
          date: "2024-03-20"
        },
        {
          id: 24,
          actor: "Technical Support",
          status: "P",
          description: "Technical training in progress to improve quick resolution.",
          date: "2024-03-20"
        },
        {
          id: 25,
          actor: "Infrastructure Team",
          status: "L",
          description: "Support tools optimized for quick resolution.",
          date: "2024-03-20"
        },
        {
          id: 26,
          actor: "IT Manager",
          status: "F",
          description: "Efficient resource management for quick support.",
          date: "2024-03-20"
        },
        {
          id: 27,
          actor: "HR",
          status: "F",
          description: "Recruitment of agents specialized in quick resolution.",
          date: "2024-03-20"
        },
        {
          id: 28,
          actor: "Training Manager",
          status: "F",
          description: "Complete training program on quick resolution.",
          date: "2024-03-19"
        },
        {
          id: 29,
          actor: "Technical Team",
          status: "L",
          description: "Technical training for quick resolution.",
          date: "2024-03-18"
        },
        {
          id: 30,
          actor: "External Consultant",
          status: "P",
          description: "Analysis of best practices for quick resolution.",
          date: "2024-03-17"
        }
      ]
    }
  ],
  "Digital Transformation": [
    {
      id: 1,
      kpi: "New Tools Adoption Rate",
      notes: [
        {
          id: 31,
          actor: "Customer Service",
          status: "P",
          description: "Customers are gradually adapting to new digital tools.",
          date: "2024-03-20"
        },
        {
          id: 32,
          actor: "Support Manager",
          status: "L",
          description: "Training in progress on new digital tools.",
          date: "2024-03-19"
        },
        {
          id: 33,
          actor: "Quality Team",
          status: "P",
          description: "Evaluation of new digital processes in progress.",
          date: "2024-03-18"
        },
        {
          id: 34,
          actor: "Technical Support",
          status: "F",
          description: "Technical support well prepared for digital transformation.",
          date: "2024-03-20"
        },
        {
          id: 35,
          actor: "Infrastructure Team",
          status: "F",
          description: "Cloud infrastructure well in place.",
          date: "2024-03-20"
        },
        {
          id: 36,
          actor: "IT Manager",
          status: "L",
          description: "Digital transformation management in progress.",
          date: "2024-03-20"
        },
        {
          id: 37,
          actor: "HR",
          status: "P",
          description: "Recruitment of new digital talents in progress.",
          date: "2024-03-20"
        },
        {
          id: 38,
          actor: "Training Manager",
          status: "L",
          description: "Digital training deployment in progress.",
          date: "2024-03-20"
        },
        {
          id: 39,
          actor: "Technical Team",
          status: "F",
          description: "Technical team well trained in new technologies.",
          date: "2024-03-20"
        },
        {
          id: 40,
          actor: "External Consultant",
          status: "L",
          description: "Digital transformation support.",
          date: "2024-03-20"
        }
      ]
    },
    {
      id: 2,
      kpi: "Operational Cost Reduction",
      notes: [
        {
          id: 41,
          actor: "Customer Service",
          status: "F",
          description: "Efficient automated response through new tools.",
          date: "2024-03-20"
        },
        {
          id: 42,
          actor: "Support Manager",
          status: "L",
          description: "Supervision of new automated response tools.",
          date: "2024-03-20"
        },
        {
          id: 43,
          actor: "Quality Team",
          status: "P",
          description: "Adapting quality processes to digital tools.",
          date: "2024-03-20"
        },
        {
          id: 44,
          actor: "Technical Support",
          status: "F",
          description: "Technical support optimized by new tools.",
          date: "2024-03-18"
        },
        {
          id: 45,
          actor: "Infrastructure Team",
          status: "L",
          description: "Cloud infrastructure optimization in progress.",
          date: "2024-03-17"
        },
        {
          id: 46,
          actor: "IT Manager",
          status: "F",
          description: "Efficient management of new digital tools.",
          date: "2024-03-16"
        },
        {
          id: 47,
          actor: "HR",
          status: "P",
          description: "Recruitment of digital specialists in progress.",
          date: "2024-03-20"
        },
        {
          id: 48,
          actor: "Training Manager",
          status: "L",
          description: "Training on new tools in progress.",
          date: "2024-03-20"
        },
        {
          id: 49,
          actor: "Technical Team",
          status: "F",
          description: "Mastery of new technical tools.",
          date: "2024-03-20"
        },
        {
          id: 50,
          actor: "External Consultant",
          status: "L",
          description: "Digital process optimization.",
          date: "2024-03-20"
        }
      ]
    },
    {
      id: 3,
      kpi: "Cloud Migration Rate",
      notes: [
        {
          id: 51,
          actor: "Customer Service",
          status: "L",
          description: "Customer tools migration to cloud in progress.",
          date: "2024-03-20"
        },
        {
          id: 52,
          actor: "Support Manager",
          status: "P",
          description: "Adapting support processes to cloud.",
          date: "2024-03-20"
        },
        {
          id: 53,
          actor: "Quality Team",
          status: "L",
          description: "Setting up cloud quality controls.",
          date: "2024-03-20"
        },
        {
          id: 54,
          actor: "Technical Support",
          status: "F",
          description: "Cloud technical support operational.",
          date: "2024-03-20"
        },
        {
          id: 55,
          actor: "Infrastructure Team",
          status: "F",
          description: "Cloud infrastructure fully deployed.",
          date: "2024-03-20"
        },
        {
          id: 56,
          actor: "IT Manager",
          status: "L",
          description: "Cloud migration management in progress.",
          date: "2024-03-20"
        },
        {
          id: 57,
          actor: "HR",
          status: "P",
          description: "Recruitment of cloud experts in progress.",
          date: "2024-03-20"
        },
        {
          id: 58,
          actor: "Training Manager",
          status: "F",
          description: "Complete cloud training deployed.",
          date: "2024-03-19"
        },
        {
          id: 59,
          actor: "Technical Team",
          status: "F",
          description: "Technical team trained in cloud.",
          date: "2024-03-18"
        },
        {
          id: 60,
          actor: "External Consultant",
          status: "L",
          description: "Cloud migration support.",
          date: "2024-03-17"
        }
      ]
    }
  ],
  "Quality Improvement": [
    {
      id: 1,
      kpi: "Standards Compliance Rate",
      notes: [
        {
          id: 61,
          actor: "Customer Service",
          status: "L",
          description: "Continuous improvement of service quality.",
          date: "2024-03-20"
        },
        {
          id: 62,
          actor: "Support Manager",
          status: "F",
          description: "Effective quality supervision.",
          date: "2024-03-19"
        },
        {
          id: 63,
          actor: "Quality Team",
          status: "F",
          description: "Well-established quality processes.",
          date: "2024-03-18"
        },
        {
          id: 64,
          actor: "Technical Support",
          status: "L",
          description: "Quality technical support.",
          date: "2024-03-20"
        },
        {
          id: 65,
          actor: "Infrastructure Team",
          status: "P",
          description: "Infrastructure improvement in progress.",
          date: "2024-03-20"
        },
        {
          id: 66,
          actor: "IT Manager",
          status: "L",
          description: "IT quality management in progress.",
          date: "2024-03-20"
        },
        {
          id: 67,
          actor: "HR",
          status: "F",
          description: "Effective quality recruitment.",
          date: "2024-03-20"
        },
        {
          id: 68,
          actor: "Training Manager",
          status: "L",
          description: "Quality training in progress.",
          date: "2024-03-20"
        },
        {
          id: 69,
          actor: "Technical Team",
          status: "P",
          description: "Technical quality training in progress.",
          date: "2024-03-20"
        },
        {
          id: 70,
          actor: "External Consultant",
          status: "L",
          description: "Quality audit in progress.",
          date: "2024-03-20"
        }
      ]
    },
    {
      id: 2,
      kpi: "Critical Error Reduction",
      notes: [
        {
          id: 71,
          actor: "Customer Service",
          status: "F",
          description: "Quick and quality response.",
          date: "2024-03-20"
        },
        {
          id: 72,
          actor: "Support Manager",
          status: "L",
          description: "Quality response supervision.",
          date: "2024-03-20"
        },
        {
          id: 73,
          actor: "Quality Team",
          status: "F",
          description: "Quality response control.",
          date: "2024-03-20"
        },
        {
          id: 74,
          actor: "Technical Support",
          status: "L",
          description: "Quality technical support.",
          date: "2024-03-18"
        },
        {
          id: 75,
          actor: "Infrastructure Team",
          status: "P",
          description: "Infrastructure optimization in progress.",
          date: "2024-03-17"
        },
        {
          id: 76,
          actor: "IT Manager",
          status: "L",
          description: "IT quality management in progress.",
          date: "2024-03-16"
        },
        {
          id: 77,
          actor: "HR",
          status: "F",
          description: "Quality recruitment in progress.",
          date: "2024-03-20"
        },
        {
          id: 78,
          actor: "Training Manager",
          status: "L",
          description: "Quality training in progress.",
          date: "2024-03-20"
        },
        {
          id: 79,
          actor: "Technical Team",
          status: "P",
          description: "Technical quality training in progress.",
          date: "2024-03-20"
        },
        {
          id: 80,
          actor: "External Consultant",
          status: "L",
          description: "Quality audit in progress.",
          date: "2024-03-20"
        }
      ]
    },
    {
      id: 3,
      kpi: "ISO Certification Rate",
      notes: [
        {
          id: 81,
          actor: "Customer Service",
          status: "F",
          description: "Customer processes compliant with ISO standards.",
          date: "2024-03-20"
        },
        {
          id: 82,
          actor: "Support Manager",
          status: "L",
          description: "Quality management compliant with ISO standards.",
          date: "2024-03-20"
        },
        {
          id: 83,
          actor: "Quality Team",
          status: "F",
          description: "Quality controls compliant with ISO standards.",
          date: "2024-03-20"
        },
        {
          id: 84,
          actor: "Technical Support",
          status: "L",
          description: "Technical processes under ISO certification.",
          date: "2024-03-20"
        },
        {
          id: 85,
          actor: "Infrastructure Team",
          status: "P",
          description: "Infrastructure under ISO certification.",
          date: "2024-03-20"
        },
        {
          id: 86,
          actor: "IT Manager",
          status: "L",
          description: "IT management under ISO certification.",
          date: "2024-03-20"
        },
        {
          id: 87,
          actor: "HR",
          status: "F",
          description: "HR processes ISO certified.",
          date: "2024-03-20"
        },
        {
          id: 88,
          actor: "Training Manager",
          status: "F",
          description: "Training program ISO certified.",
          date: "2024-03-19"
        },
        {
          id: 89,
          actor: "Technical Team",
          status: "L",
          description: "Technical processes under ISO certification.",
          date: "2024-03-18"
        },
        {
          id: 90,
          actor: "External Consultant",
          status: "P",
          description: "ISO audit in progress.",
          date: "2024-03-17"
        }
      ]
    }
  ]
};

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState<Note | null>(null);
  const [selectedBusinessCase, setSelectedBusinessCase] = useState<string>(BUSINESS_CASES[0]);
  const [businessCaseData, setBusinessCaseData] = useState<Record<string, AuditData[]>>(mockDataByBusinessCase);

  // Mettre à jour les données quand le business case change
  useEffect(() => {
    // On ne réinitialise plus les données, on utilise celles déjà modifiées
    if (!businessCaseData[selectedBusinessCase]) {
      setBusinessCaseData(prev => ({
        ...prev,
        [selectedBusinessCase]: mockDataByBusinessCase[selectedBusinessCase]
      }));
    }
  }, [selectedBusinessCase]);

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedNote(selectedNote);
  };

  const handleSave = () => {
    if (editedNote) {
      const updatedData = businessCaseData[selectedBusinessCase].map(item => ({
        ...item,
        notes: item.notes.map(note => 
          note.id === editedNote.id ? editedNote : note
        )
      }));

      setBusinessCaseData(prev => ({
        ...prev,
        [selectedBusinessCase]: updatedData
      }));
      
      setSelectedNote(editedNote);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedNote(null);
  };

  const filteredData = businessCaseData[selectedBusinessCase]?.filter(item => 
    searchDate === '' || 
    item.notes.some(note => note.date === searchDate)
  ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Audit Page</h1>
      
      {/* Business case selection */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <label htmlFor="businessCase" className="text-sm font-medium text-gray-700">
            Business Case:
          </label>
          <select
            id="businessCase"
            value={selectedBusinessCase}
            onChange={(e) => setSelectedBusinessCase(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {BUSINESS_CASES.map((bc) => (
              <option key={bc} value={bc}>
                {bc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date search bar */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <label htmlFor="dateSearch" className="text-sm font-medium text-gray-700">
            Filter by date:
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
              Clear filter
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

      {/* Modal for displaying description */}
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
                  {isEditing ? (
                    <select
                      value={editedNote?.status}
                      onChange={(e) => setEditedNote(prev => prev ? {...prev, status: e.target.value as NoteStatus} : null)}
                      className="px-3 py-1.5 rounded text-base font-medium border border-gray-300"
                    >
                      <option value="N">Not Done</option>
                      <option value="P">Partially</option>
                      <option value="L">Largely</option>
                      <option value="F">Fully</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1.5 rounded text-base font-medium ${getStatusColor(selectedNote.status)}`}>
                      {selectedNote.status}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedNote(null);
                  setIsEditing(false);
                  setEditedNote(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Detailed description:</h4>
              {isEditing ? (
                <textarea
                  value={editedNote?.description}
                  onChange={(e) => setEditedNote(prev => prev ? {...prev, description: e.target.value} : null)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
              ) : (
                <div className="text-gray-600">
                  {selectedNote.description}
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditPage; 