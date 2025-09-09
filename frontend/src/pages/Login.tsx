import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('admin@pitchvibe.test');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password);
      nav('/admin/matches', { replace: true });
    } catch (e: any) {
      setError(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-white'>Login</h1>
      {error && (
        <div className='bg-red-50 text-red-700 p-3 rounded mb-4'>{error}</div>
      )}

      <form onSubmit={onSubmit} className='space-y-4'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='you@example.com'
          className='w-full rounded-lg p-3
             bg-white/10 text-white placeholder-white/70
             border border-white/25
             focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50'
          required
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          className='w-full rounded-lg p-3
             bg-white/10 text-white placeholder-white/70
             border border-white/25
             focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50'
          required
        />
        <button
          type='submit'
          disabled={loading}
          className='px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-60'
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className='text-xs text-gray-500 mt-3'>
        Dev login — credentials live in <code>backend/.env</code>.
      </p>
    </div>
  );
}
