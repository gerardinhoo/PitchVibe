import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { fetchUpcomingMatches, type Match } from '../api/matches';

export default function Matches() {
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback((signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    fetchUpcomingMatches(signal)
      .then(setMatches)
      .catch((e: any) => {
        // Ignore fetch cancellations (StrictMode aborts the first run)
        const isAbort =
          (e && e.name === 'AbortError') ||
          (typeof e?.message === 'string' &&
            e.message.toLowerCase().includes('aborted'));
        if (isAbort) return;

        setError(e instanceof Error ? e.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4 text-white'>
        Upcoming Premier League Matches
      </h2>

      {loading && <p className='text-white-600'>Loading upcoming matches…</p>}

      {error && (
        <div className='bg-red-50 text-red-700 p-4 rounded mb-4'>
          <p className='mb-2'>Couldn’t load matches: {error}</p>
          <button
            onClick={() => load()}
            className='px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700'
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && matches && matches.length === 0 && (
        <p className='text-white-500'>No upcoming matches yet.</p>
      )}

      {!loading && !error && matches && matches.length > 0 && (
        <div className='space-y-4'>
          {matches.map((match) => (
            <div
              key={match.id}
              className='bg-white text-black p-4 rounded shadow'
            >
              <h3 className='text-xl font-semibold'>
                ⚽️ {match.homeTeam} vs {match.awayTeam}
              </h3>
              <p className='text-sm text-gray-700 flex items-center gap-2 mt-1'>
                <CalendarDays className='w-4 h-4 text-gray-500' />
                {new Date(match.matchDateAndTime).toLocaleString()} –{' '}
                {match.location}
              </p>
              <p className='text-sm text-gray-700 flex items-center gap-2'>
                🏟️ {match.location}
              </p>
              <Link
                to={`/matches/${match.id}`}
                className='text-indigo-600 underline mt-2 inline-block'
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
