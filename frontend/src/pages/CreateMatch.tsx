import { useNavigate } from 'react-router-dom';
import { upcomingMatches } from '../../data/upcomingMatches';
import MatchForm from '../components/MatchForm';

const CreateMatch = () => {
  const navigate = useNavigate();

  const handleCreate = (data: any) => {
    upcomingMatches.push({
      id: upcomingMatches.length + 1,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      location: data.location,
      matchDateAndTime: new Date(data.date),
    });

    navigate('/admin/matches');
  };

  return (
    <div className='max-w-xl mx-auto p-6'>
      <MatchForm onSubmit={handleCreate} mode='create' />
    </div>
  );
};

export default CreateMatch;
