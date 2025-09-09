import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MatchForm from '../../components/MatchForm';
import { fetchMatch, updatedMatch, type Match } from '../../api/matches';

type MatchFormData = {
  homeTeam: string;
  awayTeam: string;
  location: string;
  date: string;
};

function toDatetimeLocal(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

const EditMatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchMatch(id, controller.signal)
      .then(setMatch)
      .catch((e: any) => {
        const isAbort =
          e?.name === 'AbortError' ||
          String(e?.message || '')
            .toLowerCase()
            .includes('abort');
        if (!isAbort) setError(e?.message || 'Failed to load match');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  const initialValues = useMemo(() => {
    if (!match) return undefined;
    return {
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      location: match.location,
      date: toDatetimeLocal(match.matchDateAndTime),
    } as MatchFormData;
  }, [match]);

  const onSubmit = async (data: MatchFormData) => {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      await updatedMatch(id, {
        homeTeam: data.homeTeam.trim(),
        awayTeam: data.awayTeam.trim(),
        location: data.location.trim(),
        matchDateAndTime: new Date(data.date).toISOString(),
      });
      navigate('/admin/matches');
    } catch (e: any) {
      setError(e?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (!id) return <div className='p-6'>Invalid match id.</div>;
  if (loading) return <div className='p-6 text-gray-500'>Loading…</div>;
  if (error)
    return <div className='p-6 bg-red-50 text-red-700 rounded'>{error}</div>;
  if (!match) return <div className='p-6'>Match not found.</div>;

  return (
    <div className='max-w-xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Edit Match</h2>
      <MatchForm
        onSubmit={onSubmit}
        mode='edit'
        initialValues={initialValues}
        submitting={saving}
      />
    </div>
  );
};

export default EditMatch;
