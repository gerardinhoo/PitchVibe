// src/pages/EditMatch.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { upcomingMatches } from '../data/upcomingMatches';
import { teams } from '../data/teams';

type MatchFormData = {
  homeTeam: string;
  awayTeam: string;
  location: string;
  date: string;
};

const EditMatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const matchId = Number(id);
  const matchToEdit = upcomingMatches.find((match) => match.id === matchId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MatchFormData>();

  useEffect(() => {
    if (matchToEdit) {
      setValue('homeTeam', matchToEdit.homeTeam);
      setValue('awayTeam', matchToEdit.awayTeam);
      setValue('location', matchToEdit.location);
      setValue(
        'date',
        new Date(matchToEdit.matchDateAndTime).toISOString().slice(0, 16)
      );
    }
  }, [matchToEdit, setValue]);

  const onSubmit = (data: MatchFormData) => {
    const matchIndex = upcomingMatches.findIndex(
      (match) => match.id === matchId
    );
    if (matchIndex !== -1) {
      upcomingMatches[matchIndex] = {
        id: matchId,
        homeTeam: data.homeTeam,
        awayTeam: data.awayTeam,
        location: data.location,
        matchDateAndTime: new Date(data.date),
      };
    }

    navigate('/admin-matches');
  };

  if (!matchToEdit) {
    return <p className='text-center text-red-600'>Match not found.</p>;
  }

  return (
    <div className='max-w-xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6'>Edit Match</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='block mb-1'>Home Team</label>
          <select
            {...register('homeTeam', { required: true })}
            className='w-full p-2 rounded text-black'
          >
            <option value=''>Select Home Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          {errors.homeTeam && (
            <p className='text-red-500 text-sm'>Home Team is required.</p>
          )}
        </div>

        <div>
          <label className='block mb-1'>Away Team</label>
          <select
            {...register('awayTeam', { required: true })}
            className='w-full p-2 rounded text-black'
          >
            <option value=''>Select Away Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          {errors.awayTeam && (
            <p className='text-red-500 text-sm'>Away Team is required.</p>
          )}
        </div>

        <div>
          <label className='block mb-1'>Location</label>
          <input
            type='text'
            {...register('location', { required: true })}
            className='w-full p-2 rounded text-black'
          />
          {errors.location && (
            <p className='text-red-500 text-sm'>Location is required.</p>
          )}
        </div>

        <div>
          <label className='block mb-1'>Match Date & Time</label>
          <input
            type='datetime-local'
            {...register('date', { required: true })}
            className='w-full p-2 rounded text-black'
          />
          {errors.date && (
            <p className='text-red-500 text-sm'>Date is required.</p>
          )}
        </div>

        <button
          type='submit'
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded'
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMatch;
