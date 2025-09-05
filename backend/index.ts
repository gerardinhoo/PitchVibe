import express from 'express';
import cors from 'cors';

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

const PORT = 4000;

app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
