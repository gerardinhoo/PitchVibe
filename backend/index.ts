import express from 'express';
import cors from 'cors';
import { match } from 'assert';

const app = express();
app.use(cors());
app.use(express.json());

const upcomingMatches = [
  {
    id: 'm-001',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    location: 'Emirates Stadium',
    matchDateAndTime: new Date(Date.now() + 86400000).toISOString(),
  },
  {
    id: 'm-002',
    homeTeam: 'Liverpool',
    awayTeam: 'Man City',
    location: 'Anfield',
    matchDateAndTime: new Date(Date.now() + 172800000).toISOString(),
  },
];

app.get('/api/matches/upcoming', (req, res) => {
  res.status(200).json(upcomingMatches);
});

// Simple id helper

let nextId = 3;

const genId = () => `m${String(nextId++).padStart(3, '0')}`;

app.post('/api/matches', (req, res) => {
  const { homeTeam, awayTeam, location, matchDateAndTime } = req.body ?? {};

  // Minimal validation
  if (!homeTeam || !awayTeam || !location || !matchDateAndTime) {
    res.status(400).json({ message: 'Missing required fields' });
  }

  const dt = new Date(matchDateAndTime);

  if (Number(isNaN(dt.getTime()))) {
    return res.status(400).json({ message: 'Invalid matchDateAndTime' });
  }

  const created = {
    id: genId(),
    homeTeam: String(homeTeam),
    awayTeam: String(awayTeam),
    location: String(location),
    matchDateAndTime: dt.toISOString(),
  };

  // persist in memory for now

  upcomingMatches.push(created);

  return res.status(201).json(created);
});

app.get('/api/matches/:id', (req, res) => {
  const { id } = req.params;

  const match = upcomingMatches.find((m) => String(m.id) === String(id));

  if (!match) {
    return res.status(400).json({ message: 'Match not found' });
  }

  return res.json(match);
});

app.put('/api/matches/:id', (req, res) => {
  const { id } = req.params;

  const idx = upcomingMatches.findIndex((m) => String(m.id) === String(id));

  if (idx === -1) return res.json(404).json({ message: 'Match not found' });

  const { homeTeam, awayTeam, location, matchDateAndTime } = req.body ?? {};

  if (!homeTeam || !awayTeam || !location || !matchDateAndTime) {
    return res.status(404).json({ message: 'Missing required fields' });
  }

  const dt = new Date(matchDateAndTime);

  if (Number.isNaN(dt.getTime())) {
    return res.status(404).json({ message: 'Invalid Match Date And Time' });
  }

  const updated = {
    ...upcomingMatches[idx],
    homeTeam: String(homeTeam),
    awayTeam: String(awayTeam),
    location: String(location),
    matchDateAndTime: dt.toISOString(),
  };

  upcomingMatches[idx] = updated;

  return res.json(updated);
});

app.delete('/api/matches/:id', (req, res) => {
  let { id } = req.params;

  // Legacy numeric ids like "1" => "m-001"
  if (/^\d+$/.test(id)) id = `m-${String(id).padStart(3, '0')}`;

  const idx = upcomingMatches.findIndex((m) => String(m.id) === String(id));

  if (idx === -1) return res.status(404).json({ message: 'Match not found' });

  const [deleted] = upcomingMatches.splice(idx, 1);

  return res.status(200).json({ id: deleted.id });
});

const PORT = 4000;

app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
