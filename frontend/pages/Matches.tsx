import React from 'react';
import { Link } from 'react-router-dom';
import { upcomingMatches } from '../data/upcomingMatches';
import { CalendarDays } from 'lucide-react';

const Matches = () => {
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>
        Upcoming Premier League Matches
      </h2>
      {upcomingMatches.map((match) => (
        <div
          key={match.id}
          className='bg-white text-black p-4 rounded shadow mb-4'
        >
          <h3 className='text-xl font-semibold'>
            ⚽️ {match.homeTeam} vs {match.awayTeam}
          </h3>
          <p className='text-sm text-gray-700'>
            <CalendarDays className='w-4 h-4 text-gray-500' />
            {match.matchDateAndTime.toLocaleString()} – {match.location}
          </p>
          <p className='text-sm text-gray-700 flex items-center gap-2'>
            🏟️ {match.location}
          </p>
          <Link
            to={`/match/${match.id}`}
            className='text-indigo-600 underline mt-2 inline-block'
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Matches;
