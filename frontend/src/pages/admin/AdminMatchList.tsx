import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchUpcomingMatches,
  deleteMatch,
  type Match,
} from '../../api/matches';

export default function AdminMatches() {
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback((signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    fetchUpcomingMatches(signal)
      .then(setMatches)
      .catch((e: any) => {
        const isAbort =
          e?.name === 'AbortError' ||
          String(e?.message || '')
            .toLowerCase()
            .includes('abort');
        if (!isAbort) setError(e?.message || 'Failed to load matches');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this match? This cannot be undone.')) return;
    setDeletingId(id);
    setError(null);
    try {
      await deleteMatch(id);
      // optimistic remove
      setMatches((prev) => (prev ? prev.filter((m) => m.id !== id) : prev));
    } catch (e: any) {
      setError(e?.message || 'Failed to delete match');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold mb-6'>All Matches (Admin View)</h2>

      {loading && <p className='text-gray-500'>Loading…</p>}
      {error && (
        <div className='bg-red-50 text-red-700 p-3 rounded'>{error}</div>
      )}

      {!loading && !error && matches && (
        <div className='space-y-4'>
          {matches.map((m) => (
            <div key={m.id} className='bg-white text-black p-4 rounded shadow'>
              <h3 className='text-xl font-semibold'>
                {m.homeTeam} vs {m.awayTeam}
              </h3>
              <p className='text-sm text-gray-700'>
                {new Date(m.matchDateAndTime).toLocaleString()} — {m.location}
              </p>
              <div className='flex gap-4 mt-2'>
                <Link
                  to={`/matches/${m.id}`}
                  className='text-indigo-600 underline'
                >
                  View
                </Link>
                <Link
                  to={`/admin/matches/${m.id}/edit`}
                  className='text-yellow-700'
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(m.id)}
                  disabled={deletingId === m.id}
                  className='text-red-700 disabled:opacity-60'
                >
                  {deletingId === m.id ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
          {matches.length === 0 && (
            <p className='text-gray-500'>No matches found.</p>
          )}
        </div>
      )}
    </div>
  );
}
