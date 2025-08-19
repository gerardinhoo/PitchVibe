import React from 'react';
import { Link } from 'react-router-dom';
import { upcomingMatches } from '../../data/upcomingMatches';

const AdminMatchList = () => {
  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold mb-6'>All Matches (Admin View)</h2>
      {upcomingMatches.map((match, index) => (
        <div
          key={index}
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
            {/* Future Actions */}
            <button className='text-yellow-700 hover:underline'>Edit</button>
            <button className='text-red-600 hover:underline'>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMatchList;
