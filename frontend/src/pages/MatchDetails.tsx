import React from 'react';
import { useParams } from 'react-router-dom';
import { upcomingMatches } from '../../data/upcomingMatches';
import { Link } from 'react-router-dom';

const MatchDetails = () => {
  const { id } = useParams();

  const matchId = Number(id);
  const match = upcomingMatches.find((m) => m.id === matchId);

  if (!match) {
    return (
      <div className='flex flex-col items-center justify-center h-[70vh] text-center px-4'>
        <p className='text-orange-300 text-3xl font-semibold mb-4'>
          Match not found.
        </p>
        <Link
          to='/match'
          className='px-5 py-2 rounded-md bg-white text-indigo-700 font-medium hover:bg-indigo-100 transition'
        >
          ← Back to Matches
        </Link>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center min-h-[70vh] px-4'>
      <div className='bg-white text-black rounded-lg shadow-lg p-6 max-w-xl w-full'>
        <h2 className='text-2xl font-bold flex items-center gap-2 mb-4'>
          ⚽ {match.homeTeam} vs {match.awayTeam}
        </h2>
        <p className='flex items-center gap-2 text-gray-800 mb-2'>
          📅 {match.matchDateAndTime.toLocaleString()}
        </p>
        <p className='flex items-center gap-2 text-gray-800'>
          🏟️ {match.location}
        </p>
      </div>
    </div>
  );
};

export default MatchDetails;
