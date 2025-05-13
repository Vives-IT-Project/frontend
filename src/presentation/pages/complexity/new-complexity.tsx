import React, { useState } from 'react';

type Criteria = {
  id: number;
  text: string;
  note: number | string;
  weight: number;
};

const DEFAULT_CRITERIA: Criteria[] = [
  { id: 1, text: 'Clear explanation of the topic', note: 9, weight: 30 },
  { id: 2, text: 'Visual support', note: 8, weight: 25 },
];

const BusinessCaseComplexity: React.FC = () => {
  const [criteriaList, setCriteriaList] = useState<Criteria[]>(DEFAULT_CRITERIA);

  const handleNoteChange = (id: number, newNote: string) => {
    // Permitimos solo cadenas vacías o valores positivos mayores a 0
    if (newNote === '' || (!isNaN(Number(newNote)) && Number(newNote) > 0)) {
      setCriteriaList(prev =>
        prev.map(item =>
          item.id === id ? { ...item, note: newNote } : item
        )
      );
    }
  };

  // Cálculo de complejidad total
  const totalComplexity = criteriaList.reduce((acc, item) => {
    const note = parseFloat(item.note.toString());
    return acc + (isNaN(note) ? 0 : note * item.weight);
  }, 0);

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

      <div className="bg-white shadow-md rounded px-4 py-3 border border-gray-300 w-full max-w-md mx-auto">
        <p className="text-center font-semibold text-gray-700">
          Total Weighted Complexity:{' '}
          <span className="text-[#344966]">{totalComplexity.toFixed(2)}</span>
        </p>
        <p>

          ashodjashdkjashkjdhasjkdjkasdjkhasjkdhjakshdkjashd
        </p>
      </div>
      <p>asjkldlaskldklaskldjaklsdkljas</p>
    </div>
  );
};

export default BusinessCaseComplexity;

