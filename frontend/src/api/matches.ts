export type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  matchDateAndTime: string;
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
