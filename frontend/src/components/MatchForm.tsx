// MatchForm.tsx
import { useForm } from 'react-hook-form';
import { teams } from '../../data/teams';

type MatchFormData = {
  homeTeam: string;
  awayTeam: string;
  location: string;
  date: string;
};

type Props = {
  defaultValues?: MatchFormData;
  onSubmit: (data: MatchFormData) => void;
  mode?: 'create' | 'edit';
};

const MatchForm = ({ defaultValues, onSubmit, mode = 'create' }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MatchFormData>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <h2 className='text-2xl font-bold mb-6'>
        {mode === 'edit' ? 'Edit Match' : 'Create A New Match'}
      </h2>

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
          <p className='text-red-500 text-sm'>Home Team is required</p>
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
          <p className='text-red-500 text-sm'>Away Team is required</p>
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
          <p className='text-red-500 text-sm'>Location is required</p>
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
        {mode === 'edit' ? 'Update Match' : 'Create Match'}
      </button>
    </form>
  );
};

export default MatchForm;
