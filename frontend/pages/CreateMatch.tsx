import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { upcomingMatches } from '../data/upcomingMatches';
import { teams } from '../data/teams';

type MatchFormData = {
  homeTeam: string;
  awayTeam: string;
  location: string;
  date: string;
};

const CreateMatch = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MatchFormData>();

  const onSubmit = (data: MatchFormData) => {
    upcomingMatches.push({
      id: upcomingMatches.length + 1,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      location: data.location,
      matchDateAndTime: new Date(data.date),
    });

    reset();
    navigate('/match');
  };

  return (
    <div className='max-w-xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6'>Create A New Match</h2>
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
            <p className='text-red-500 text-sm'>Home Team Is Required</p>
          )}
        </div>

        <div>
          <label className='block mb-1'>Away Team</label>
          <select
            {...register('homeTeam', { required: true })}
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
            <p className='text-red-500 text-sm'>Away Team Is Required</p>
          )}
        </div>

        <div>
          <label className='block mb-1'>Location</label>
          <input
            type='text'
            {...register('location', { required: true })}
            className='w-full p-2 rounded text-black'
            placeholder='e.g., Emirates Stadium, London'
          />
          {errors.location && (
            <p className='text-red-500 text-sm'>Location Is required</p>
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
            <p className='text-red-500 text-sm'>Date and time are required</p>
          )}
        </div>

        <button
          type='submit'
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded'
        >
          Create Match
        </button>
      </form>
    </div>
  );
};

export default CreateMatch;
