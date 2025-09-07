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
const PORT = 4000;

app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
