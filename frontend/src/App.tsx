import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MatchDetails from '../pages/MatchDetails';
import Profile from '../pages/Profile';
import Matches from '../pages/Matches';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-700 text-white'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/match/:id' element={<MatchDetails />} />
        <Route path='/match' element={<Matches />} />
      </Routes>
    </div>
  );
};

export default App;
