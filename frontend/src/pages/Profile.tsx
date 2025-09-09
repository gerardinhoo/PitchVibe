import { useEffect, useMemo, useState } from 'react';
import {
  User,
  Bell,
  Settings,
  Save,
  Star,
  Clock,
  MapPin,
  RotateCcw,
} from 'lucide-react';
import { teams } from '../../data/teams';

type ProfileData = {
  displayName: string;
  email: string;
  favoriteTeam: string; // team name from data/teams
  timeFormat: '12h' | '24h';
  timezone: string; // e.g., "America/New_York"
  notifications: {
    matchReminders: boolean;
    adminAlerts: boolean;
  };
};

const defaultProfile = (): ProfileData => ({
  displayName: '',
  email: '',
  favoriteTeam: '',
  timeFormat: '12h',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  notifications: {
    matchReminders: true,
    adminAlerts: false,
  },
});

const STORAGE_KEY = 'pv_profile';

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProfile((p) => ({ ...p, ...parsed }));
      }
    } catch {
      // ignore parse errors; fall back to defaults
    }
  }, []);

  const initials = useMemo(() => {
    const parts = profile.displayName.trim().split(/\s+/).filter(Boolean);
    return (
      parts
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase())
        .join('') || 'PV'
    );
  }, [profile.displayName]);

  const handleChange =
    <K extends keyof ProfileData>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.currentTarget.type === 'checkbox'
          ? (e.currentTarget as HTMLInputElement).checked
          : e.currentTarget.value;
      if (key === 'notifications') return; // handled by dedicated handler below
      setProfile((p) => ({ ...p, [key]: value as any }));
    };

  const handleNotifChange =
    (field: keyof ProfileData['notifications']) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.currentTarget.checked;
      setProfile((p) => ({
        ...p,
        notifications: { ...p.notifications, [field]: checked },
      }));
    };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    // normalize email/strings
    const payload: ProfileData = {
      ...profile,
      displayName: profile.displayName.trim(),
      email: profile.email.trim(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    // tiny delay for UX
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 300);
  };

  const onReset = () => {
    const next = defaultProfile();
    setProfile(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='mb-6 flex items-center gap-3'>
        <Settings className='w-6 h-6 text-white' />
        <h1 className='text-2xl font-bold text-white'>Profile</h1>
      </div>

      {saved && (
        <div className='mb-4 rounded bg-green-50 text-green-700 px-4 py-2'>
          Preferences saved.
        </div>
      )}

      <form onSubmit={onSave} className='grid gap-6 md:grid-cols-2'>
        {/* Account card */}
        <section className='bg-white text-black rounded-xl shadow p-5'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='w-14 h-14 rounded-full bg-indigo-600 text-white grid place-items-center text-lg font-semibold'>
              {initials || <User className='w-6 h-6' />}
            </div>
            <div>
              <p className='text-sm text-gray-600'>Signed in user (local)</p>
              <p className='font-semibold'>
                {profile.displayName || 'Your name'}
              </p>
            </div>
          </div>

          <label className='block text-sm mb-1'>Display name</label>
          <input
            className='w-full border rounded p-2 mb-4 text-black'
            placeholder='e.g. Alex Morgan'
            value={profile.displayName}
            onChange={handleChange('displayName')}
          />

          <label className='block text-sm mb-1'>Email</label>
          <input
            type='email'
            className='w-full border rounded p-2 text-black'
            placeholder='you@example.com'
            value={profile.email}
            onChange={handleChange('email')}
          />
        </section>

        {/* Preferences card */}
        <section className='bg-white text-black rounded-xl shadow p-5'>
          <h2 className='font-semibold mb-3 flex items-center gap-2'>
            <Star className='w-4 h-4 text-amber-500' /> Preferences
          </h2>

          <label className='block text-sm mb-1'>Favorite team</label>
          <select
            className='w-full border rounded p-2 mb-4 text-black'
            value={profile.favoriteTeam}
            onChange={handleChange('favoriteTeam')}
          >
            <option value=''>— Select a team —</option>
            {teams?.map((t) => (
              <option key={t.name ?? t} value={t.name ?? t}>
                {t.name ?? t}
              </option>
            ))}
          </select>

          <label className='block text-sm mb-1'>Time format</label>
          <div className='flex gap-3 mb-4'>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='timeFormat'
                value='12h'
                checked={profile.timeFormat === '12h'}
                onChange={handleChange('timeFormat')}
              />
              <span className='text-sm'>12-hour</span>
            </label>
            <label className='flex items-center gap-2'>
              <input
                type='radio'
                name='timeFormat'
                value='24h'
                checked={profile.timeFormat === '24h'}
                onChange={handleChange('timeFormat')}
              />
              <span className='text-sm'>24-hour</span>
            </label>
          </div>

          <label className='block text-sm mb-1 flex items-center gap-2'>
            <MapPin className='w-4 h-4 text-gray-500' />
            Timezone
          </label>
          <input
            className='w-full border rounded p-2 mb-2 text-black'
            value={profile.timezone}
            onChange={handleChange('timezone')}
            placeholder='e.g. Europe/London'
          />
          <p className='text-xs text-gray-500 mb-4'>
            Detected: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>

          <h3 className='font-semibold mb-2 flex items-center gap-2'>
            <Bell className='w-4 h-4 text-indigo-600' /> Notifications
          </h3>
          <label className='flex items-center gap-2 mb-2'>
            <input
              type='checkbox'
              checked={profile.notifications.matchReminders}
              onChange={handleNotifChange('matchReminders')}
            />
            <span className='text-sm'>Match reminders</span>
          </label>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={profile.notifications.adminAlerts}
              onChange={handleNotifChange('adminAlerts')}
            />
            <span className='text-sm'>Admin alerts</span>
          </label>
        </section>

        {/* Footer actions */}
        <div className='md:col-span-2 flex flex-wrap gap-3'>
          <button
            type='submit'
            disabled={saving}
            className='inline-flex items-center gap-2 rounded bg-indigo-600 text-white px-4 py-2 font-medium disabled:opacity-60'
          >
            <Save className='w-4 h-4' />
            {saving ? 'Saving…' : 'Save preferences'}
          </button>
          <button
            type='button'
            onClick={onReset}
            className='inline-flex items-center gap-2 rounded bg-white text-indigo-700 px-4 py-2 font-medium border border-indigo-200 hover:bg-gray-50'
          >
            <RotateCcw className='w-4 h-4' />
            Reset to defaults
          </button>
          <div className='ml-auto flex items-center gap-2 text-sm text-white'>
            <Clock className='w-4 h-4' />
            Preview time:{' '}
            {new Date().toLocaleString(
              undefined,
              profile.timezone
                ? {
                    timeZone: profile.timezone,
                    hour12: profile.timeFormat === '12h',
                  }
                : { hour12: profile.timeFormat === '12h' }
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
