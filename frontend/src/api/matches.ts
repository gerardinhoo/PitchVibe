import { getToken } from './auth';

export type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  matchDateAndTime: string;
};

export type NewMatch = {
  homeTeam: string;
  awayTeam: string;
  location: string;
  matchDateAndTime: string; // ISO
};

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export async function fetchUpcomingMatches(
  signal?: AbortSignal
): Promise<Match[]> {
  const res = await fetch(`${BASE_URL}/api/matches/upcoming`, { signal });

  if (!res.ok) {
    throw new Error(`Failed to load matches (${res.status})`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) throw new Error('Unexpected API response');
  return data;
}

export async function createMatch(input: NewMatch): Promise<Match> {
  const res = await fetch(`${BASE_URL}/api/matches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(
      `Failed to create match (${res.status}) ${msg || ''}`.trim()
    );
  }

  const data = await res.json();

  return {
    id: String(data.id),
    homeTeam: String(data.homeTeam),
    awayTeam: String(data.awayTeam),
    location: String(data.location),
    matchDateAndTime: String(data.matchDateAndTime),
  };
}

export async function fetchMatch(
  id: string,
  signal?: AbortSignal
): Promise<Match> {
  const res = await fetch(`${BASE_URL}/api/matches/${encodeURIComponent(id)}`, {
    signal,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`Failed to load match (${res.status}) ${msg || ''}`.trim());
  }
  const data = await res.json();
  return {
    id: String(data.id),
    homeTeam: String(data.homeTeam),
    awayTeam: String(data.awayTeam),
    location: String(data.location),
    matchDateAndTime: String(data.matchDateAndTime),
  };
}

export async function updatedMatch(
  id: string,
  input: NewMatch
): Promise<Match> {
  const res = await fetch(`${BASE_URL}/api/matches/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(
      `Failed to update match (${res.status}) ${msg || ''}`.trim()
    );
  }

  const data = await res.json();
  return {
    id: String(data.id),
    homeTeam: String(data.homeTeam),
    awayTeam: String(data.awayTeam),
    location: String(data.location),
    matchDateAndTime: String(data.matchDateAndTime),
  };
}

export async function deleteMatch(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/matches/${encodeURIComponent(id)}`, {
    headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : undefined,
    method: 'DELETE',
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(
      `Failed to delete match (${res.status}) ${msg || ''}`.trim()
    );
  }
}
