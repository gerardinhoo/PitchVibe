import { useForm } from 'react-hook-form';

export type MatchFormValues = {
  homeTeam: string;
  awayTeam: string;
  location: string;
  date: string;
};

type MatchFormProps = {
  onSubmit: (data: MatchFormValues) => void | Promise<void>;
  mode: 'create' | 'edit';
  submitting?: boolean;
  initialValues?: Partial<MatchFormValues>;
};

export default function MatchForm({
  onSubmit,
  mode,
  submitting = false,
  initialValues,
}: MatchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<MatchFormValues>({
    defaultValues: {
      homeTeam: initialValues?.homeTeam ?? '',
      awayTeam: initialValues?.awayTeam ?? '',
      location: initialValues?.location ?? '',
      date: initialValues?.date ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block text-sm mb-1'>Home Team</label>
        <input
          className='w-full border rounded p-2 text-black'
          placeholder='Arsenal'
          {...register('homeTeam', { required: 'Home team is required' })}
        />
        {errors.homeTeam && (
          <p className='text-red-400 text-sm mt-1'>{errors.homeTeam.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm mb-1'>Away Team</label>
        <input
          className='w-full border rounded p-2 text-black'
          placeholder='Chelsea'
          {...register('awayTeam', { required: 'Away team is required' })}
        />
        {errors.awayTeam && (
          <p className='text-red-400 text-sm mt-1'>{errors.awayTeam.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm mb-1'>Stadium</label>
        <input
          className='w-full border rounded p-2 text-black'
          placeholder='Emirates Stadium'
          {...register('location', { required: 'Location is required' })}
        />
        {errors.location && (
          <p className='text-red-400 text-sm mt-1'>{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm mb-1'>Date & Time</label>
        <input
          type='datetime-local'
          className='w-full border rounded p-2 text-black'
          {...register('date', { required: 'Date & time is required' })}
        />
        {errors.date && (
          <p className='text-red-400 text-sm mt-1'>{errors.date.message}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={submitting || isSubmitting}
        className='px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-60'
      >
        {submitting || isSubmitting
          ? mode === 'edit'
            ? 'Saving…'
            : 'Creating…'
          : mode === 'edit'
          ? 'Save Changes'
          : 'Create Match'}
      </button>
    </form>
  );
}
