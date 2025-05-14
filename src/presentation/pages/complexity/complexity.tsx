import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


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


const Complexity: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1) Al inicializar, intento leer de sessionStorage.
  const [criteriaList, setCriteriaList] = useState<Criteria[]>(() => {
    const stored = sessionStorage.getItem('criteriaList');
    return stored ? JSON.parse(stored) : DEFAULT_CRITERIA;
  });

  // 2) Cada vez que cambie criteriaList, lo guardo en sessionStorage.
  useEffect(() => {
    sessionStorage.setItem('criteriaList', JSON.stringify(criteriaList));
  }, [criteriaList]);

  useEffect(() => {
    const newCriterion = location.state?.newCriterion as Criteria | undefined;
    if (newCriterion) {
      setCriteriaList(prev => {
        // Si ya existe uno con ese id, devolvemos el array original
        if (prev.some(c => c.id === newCriterion.id)) {
          return prev;
        }
        // Si no, lo añadimos
        return [...prev, newCriterion];
      });
      // Limpiamos el state de navegación para no re-procesarlo nunca más
 
    }
  }, [location.state, navigate]);

  const eraseItem = (id: number) => {
    setCriteriaList(prev => prev.filter(item => item.id !== id));
  };
  
  const editItem = (id: number) => {
    const item = criteriaList.find(i => i.id === id);
    if (item) {
      setEditingItem(item); // muestra modal
    }
  };
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [weight, setWeight] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);  
  const [editingItem, setEditingItem] = useState<Criteria | null>(null);
  return (
    <div className="overflow-x-auto p-6 bg-gray-100 min-h-screen relative">
      <div className="mb-4">
        <button
          className="bg-[#344966] text-white px-4 py-2 rounded"
          onClick={() => setShowCreateModal(true)}
        >
          <p>Create a new criterion</p>
        </button>
      </div>
  
      <table className="min-w-full border border-gray-300 text-left text-sm">
        <thead>
          <tr className="bg-[#344966] text-white">
            <th className="px-4 py-2">Criteria</th>
            <th className="px-4 py-2">Note</th>
            <th className="px-4 py-2">Weight</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {criteriaList.map(item => (
            <tr key={item.id}>
              <td className="px-4 py-2 text-justify">{item.text}</td>
              <td className="px-4 py-2">{item.note}</td>
              <td className="px-4 py-2">{item.weight}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => eraseItem(item.id)}
                  className="bg-[#344966] text-white px-3 py-1 rounded"
                >
                  Erase
                </button>
                <button
                  onClick={() => editItem(item.id)}
                  className="bg-[#344966] text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* MODAL */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-center">Edit Criterion</h2>
            <input
              className="w-full border px-3 py-2 rounded"
              placeholder="Text"
              value={editingItem.text}
              onChange={(e) =>
                setEditingItem({ ...editingItem, text: e.target.value })
              }
            />
            <input
              className="w-full border px-3 py-2 rounded"
              placeholder="Note"
              type="number"
              value={editingItem.note}
              onChange={(e) =>
                setEditingItem({ ...editingItem, note: e.target.value })
              }
            />
            <input
              className="w-full border px-3 py-2 rounded"
              placeholder="Weight"
              type="number"
              value={editingItem.weight}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  weight: parseFloat(e.target.value),
                })
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setEditingItem(null)}
              >
                Cancel
              </button>
              <button
                className="bg-[#344966] text-white px-4 py-2 rounded"
                onClick={() => {
                  setCriteriaList(prev =>
                    prev.map(i =>
                      i.id === editingItem.id ? editingItem : i
                    )
                  );
                  setEditingItem(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )},
      {showCreateModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
      <h2 className="text-xl font-bold text-center">Create New Criterion</h2>
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Note"
        type="number"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Weight"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <div className="flex justify-end space-x-2">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={() => {
            setText('');
            setNote('');
            setWeight('');
            setShowCreateModal(false);
          }}
        >
          Cancel
        </button>
        <button
          className="bg-[#344966] text-white px-4 py-2 rounded"
          onClick={() => {
            if (!text || isNaN(Number(note)) || isNaN(parseFloat(weight))) return;

            const newCriterion = {
              id: Date.now(),
              text,
              note: Number(note),
              weight: parseFloat(weight),
            };

            setCriteriaList(prev => [...prev, newCriterion]);
            setText('');
            setNote('');
            setWeight('');
            setShowCreateModal(false);
          }}
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

export default Complexity;
