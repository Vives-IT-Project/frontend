import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Criteria = {
  id: number;
  text: string;
  note: number | string;
  weight: number;
};

const NewComplexity: React.FC = () => {
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [weight, setWeight] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCriterion: Criteria = {
      id: Date.now(),
      text,
      note: note,
      weight: parseFloat(weight),
    };

    // Volver a complexity con el nuevo criterio
    navigate('/complexity', { state: { newCriterion } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">Create New Criterion</h2>

        <input
          className="w-full border border-gray-300 px-4 py-2 rounded"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded"
          placeholder="Note"
          type="number"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded"
          placeholder="Weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#344966] text-white px-4 py-2 rounded"
        >
          Save Criterion
        </button>
      </form>
    </div>
  );
};

export default NewComplexity;