import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MatchDetails from '../pages/MatchDetails';
import Profile from '../pages/Profile';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/match/:id' element={<MatchDetails />} />
      </Routes>
    </>
  );
};

export default App;
