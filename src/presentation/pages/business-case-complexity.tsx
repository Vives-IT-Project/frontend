import React, { useState } from 'react';

type Criteria = {
  id: number;
  text: string;
  note: number | string;
  weight: number;
};

const ALL_CRITERIA: Criteria[] = [
  { id: 1, text: 'Clear explanation of the topic', note: '', weight: 30 },
  { id: 2, text: 'Visual support', note: '', weight: 25 },
  { id: 3, text: 'Engagement with the audience', note: '', weight: 20 },
  { id: 4, text: 'Content structure', note: '', weight: 15 },
];

const BusinessCaseComplexity: React.FC = () => {
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([]);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleNoteChange = (id: number, newNote: string) => {
    if (newNote === '' || (!isNaN(Number(newNote)) && Number(newNote) > 0)) {
      setCriteriaList(prev =>
        prev.map(item =>
          item.id === id ? { ...item, note: newNote } : item
        )
      );
    }
  };

  const totalComplexity = criteriaList.reduce((acc, item) => {
    const note = parseFloat(item.note.toString());
    return acc + (isNaN(note) ? 0 : note * item.weight);
  }, 0);

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSaveSelection = () => {
    const selectedCriteria = ALL_CRITERIA.filter(c => selectedIds.includes(c.id));
    setCriteriaList(selectedCriteria);
    setShowSelectModal(false);
  };

  return (
    <div className="overflow-x-auto p-6 bg-gray-100 min-h-screen relative">
      <style>
        {`
          input[type=number]::-webkit-outer-spin-button,
          input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>

      {/* Botón para abrir el modal */}
      <button
        className="mb-4 bg-[#344966] text-white px-4 py-2 rounded hover:bg-[#2a3a5f]"
        onClick={() => {
          setSelectedIds(criteriaList.map(c => c.id)); // precargar seleccionados
          setShowSelectModal(true);
        }}
      >
        Select Criteria
      </button>

      {/* Tabla */}
      <table className="min-w-full border border-gray-300 text-left text-sm mb-6">
        <thead>
          <tr className="bg-[#344966] text-white">
            <th className="px-4 py-2">Criteria</th>
            <th className="px-4 py-2">Note</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {criteriaList.map(item => (
            <tr key={item.id}>
              <td className="px-4 py-2 text-justify">{item.text}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  min="1"
                  className="w-full border border-gray-300 px-2 py-1 rounded"
                  value={item.note}
                  onChange={(e) => handleNoteChange(item.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="bg-white shadow-md rounded px-4 py-3 border border-gray-300 w-full max-w-md mx-auto">
        <p className="text-center font-semibold text-gray-700">
          Total Weighted Complexity:{' '}
          <span className="text-[#344966]">{totalComplexity.toFixed(2)}</span>
        </p>
      </div>

      {/* Modal de selección */}
      {showSelectModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl space-y-4">
      <h2 className="text-xl font-bold text-center">Select Criteria</h2>

      <div className="overflow-x-auto max-h-64 overflow-y-auto">
        <table className="min-w-full border border-gray-300 text-left text-sm">
          <thead>
            <tr className="bg-[#344966] text-white">
              <th className="px-4 py-2">Select</th>
              <th className="px-4 py-2">Criteria</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {ALL_CRITERIA.map(criterion => (
              <tr key={criterion.id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(criterion.id)}
                    onChange={() => handleCheckboxChange(criterion.id)}
                  />
                </td>
                <td className="px-4 py-2 text-justify">{criterion.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={() => setShowSelectModal(false)}
        >
          Cancel
        </button>
        <button
          className="bg-[#344966] text-white px-4 py-2 rounded"
          onClick={handleSaveSelection}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default BusinessCaseComplexity;
