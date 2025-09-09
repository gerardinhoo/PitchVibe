import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MatchForm from '../components/MatchForm';
import { createMatch } from '../api/matches';

const CreateMatch = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleCreate = async (data: any) => {
    setSubmitting(true);
    setError(null);
    try {
      await createMatch({
        homeTeam: data.homeTeam.trim(),
        awayTeam: data.awayTeam.trim(),
        location: data.location.trim(),
        matchDateAndTime: new Date(data.date).toISOString(), // normalize to ISO
      });
      navigate('/admin/matches');
    } catch (e: any) {
      setError(e?.message || 'Failed to create match');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='max-w-xl mx-auto p-6'>
      {error && (
        <div className='bg-red-50 text-red-700 p-3 rounded mb-4'>{error}</div>
      )}
      <MatchForm onSubmit={handleCreate} mode='create' />
    </div>
  );
};

export default CreateMatch;
