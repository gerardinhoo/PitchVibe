import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { upcomingMatches as initialMatches } from '../../../data/upcomingMatches';

const AdminMatchList = () => {
  const [matches, setMatches] = useState(initialMatches);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this match?'
    );

    if (!confirmDelete) return;

    const updatedMatches = matches.filter((match) => match.id !== id);
    setMatches(updatedMatches);
  };

  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold mb-6'>All Matches (Admin View)</h2>

      {matches.length === 0 && (
        <p className='text-gray-400'>No Matches Available</p>
      )}

      {matches.map((match) => (
        <div
          key={match.id}
          className='bg-white text-black p-4 rounded shadow mb-4 flex justify-between items-center'
        >
          <div>
            <h3 className='text-xl font-semibold'>
              {match.homeTeam ?? 'TBD'} vs {match.awayTeam ?? 'TBD'}
            </h3>
            <p className='text-sm text-gray-700'>
              {match.matchDateAndTime.toLocaleString()} – {match.location}
            </p>
          </div>
          <div className='flex gap-4'>
            <Link
              to={`/match/${match.id}`}
              className='text-indigo-600 underline'
            >
              View
            </Link>
            <Link
              to={`/admin/match/${match.id}/edit`}
              className='text-yellow-700 hover:underline'
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(match.id)}
              className='text-red-600 hover:underline'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMatchList;
