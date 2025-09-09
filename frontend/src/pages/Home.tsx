// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, PlusCircle, Shield } from 'lucide-react';
import { fetchUpcomingMatches, type Match } from '../api/matches';

export default function Home() {
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchUpcomingMatches(controller.signal)
      .then((list) => setMatches(list.slice(0, 3))) // preview top 3
      .catch((e: any) => {
        const isAbort =
          e?.name === 'AbortError' ||
          String(e?.message || '')
            .toLowerCase()
            .includes('abort');
        if (!isAbort) setError(e?.message || 'Failed to load matches');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <div className='p-6'>
      {/* Hero */}
      <section className='rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-8 mb-8 shadow'>
        <div className='max-w-3xl'>
          <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight'>
            Track Premier League fixtures with{' '}
            <span className='underline decoration-white/40'>PitchVibe</span>
          </h1>
          <p className='mt-3 text-white/90'>
            Browse upcoming matches, view details, and manage fixtures all in
            one place.
          </p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Link
              to='/matches'
              className='inline-flex items-center gap-2 rounded-lg bg-white text-indigo-700 px-4 py-2 font-medium hover:bg-white/90'
            >
              View Matches <ArrowRight className='w-4 h-4' />
            </Link>
            <Link
              to='/create-match'
              className='inline-flex items-center gap-2 rounded-lg bg-indigo-900/40 text-white px-4 py-2 font-medium hover:bg-indigo-900/60'
            >
              <PlusCircle className='w-4 h-4' /> Create Match
            </Link>
          </div>
        </div>
      </section>

      {/* Next Up */}
      <section>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-white'>Next up</h2>
          <Link to='/matches' className='text-indigo-600 hover:underline'>
            See all
          </Link>
        </div>

        {loading && (
          <div className='grid gap-4 md:grid-cols-2'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='bg-white text-black rounded shadow p-4 animate-pulse'
              >
                <div className='h-5 w-2/3 bg-gray-200 rounded mb-3' />
                <div className='h-4 w-1/2 bg-gray-200 rounded' />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className='bg-red-50 text-red-700 p-4 rounded'>
            Couldn’t load matches: {error}
          </div>
        )}

        {!loading && !error && matches && matches.length === 0 && (
          <p className='text-gray-500'>No upcoming matches yet.</p>
        )}

        {!loading && !error && matches && matches.length > 0 && (
          <div className='grid gap-4 md:grid-cols-2'>
            {matches.map((m) => (
              <Link
                key={m.id}
                to={`/matches/${m.id}`}
                className='block bg-white text-black rounded shadow p-4 hover:shadow-md transition'
              >
                <h3 className='text-lg font-semibold'>
                  ⚽️ {m.homeTeam} vs {m.awayTeam}
                </h3>
                <p className='mt-1 text-sm text-gray-700 flex items-center gap-2'>
                  <CalendarDays className='w-4 h-4 text-gray-500' />
                  {new Date(m.matchDateAndTime).toLocaleString()} — {m.location}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Quick Admin */}
      <section className='mt-10'>
        <div className='mb-3 flex items-center gap-2'>
          <Shield className='w-5 h-5 text-gray-500' />
          <h2 className='text-lg font-semibold text-white'>Quick admin</h2>
        </div>
        <div className='flex flex-wrap gap-3'>
          <Link
            to='/create-match'
            className='rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700'
          >
            Create Match
          </Link>
          <Link
            to='/admin/matches'
            className='rounded-lg bg-white text-indigo-700 px-4 py-2 font-medium hover:bg-gray-50 border border-indigo-200'
          >
            Admin Matches
          </Link>
        </div>
      </section>
    </div>
  );
}
