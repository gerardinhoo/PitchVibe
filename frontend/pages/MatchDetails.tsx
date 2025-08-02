import React from 'react';
import { useParams } from 'react-router-dom';

const MatchDetails = () => {
  const { id } = useParams();

  return (
    <div className='p-4 text-xl font-bold'>
      Match Details for match ID: {id}
    </div>
  );
};

export default MatchDetails;
