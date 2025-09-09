import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMatch, type Match } from '../api/matches';

const MatchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        if (!isAbort) setError(e?.message || 'Unknown error');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  if (!id) return <p className='p-6'>Invalid Match Id.</p>;
  if (loading) return <p className='p-6 text-gray-500'>Loading match…</p>;

  if (error) {
    return (
      <div className='p-6 bg-red-50 text-red-700 rounded'>
        <p>Couldn’t load match: {error}</p>
        <Link to='/matches' className='underline mt-2 inline-block'>
          ← Back to matches
        </Link>
      </div>
    );
  }

  if (!match) {
    return (
      <div className='flex flex-col items-center justify-center h-[70vh] text-center px-4'>
        <p className='text-orange-300 text-3xl font-semibold mb-4'>
          Match not found.
        </p>
        <Link
          to='/matches'
          className='px-5 py-2 rounded-md bg-white text-indigo-700 font-medium hover:bg-indigo-100 transition'
        >
          ← Back to Matches
        </Link>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-2'>
        ⚽️ {match.homeTeam} vs {match.awayTeam}
      </h2>
      <p className='text-sm text-gray-700 flex items-center gap-2'>
        📅 {new Date(match.matchDateAndTime).toLocaleString()} –{' '}
        {match.location}
      </p>
      <p className='text-sm text-gray-700 mt-2'>🏟️ {match.location}</p>
      <Link
        to='/matches'
        className='text-indigo-600 underline mt-4 inline-block'
      >
        ← Back to matches
      </Link>
    </div>
  );
};

export default MatchDetails;
