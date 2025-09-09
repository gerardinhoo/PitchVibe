import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Matches from './pages/Matches';
import MatchDetails from './pages/MatchDetails';
import Login from './pages/Login';
import CreateMatch from './pages/admin/CreateMatch';
import AdminMatches from './pages/admin/AdminMatches';
import EditMatch from './pages/admin/EditMatch';
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/matches' element={<Matches />} />
        <Route path='/matches/:id' element={<MatchDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />

        <Route
          path='/create-match'
          element={
            <RequireAuth>
              <CreateMatch />
            </RequireAuth>
          }
        />
        <Route
          path='/admin/matches'
          element={
            <RequireAuth>
              <AdminMatches />
            </RequireAuth>
          }
        />
        <Route
          path='/admin/matches/:id/edit'
          element={
            <RequireAuth>
              <EditMatch />
            </RequireAuth>
          }
        />

        {/* legacy redirects */}
        <Route
          path='/match/:id'
          element={<Navigate to='/matches/:id' replace />}
        />
        <Route path='/match' element={<Navigate to='/matches' replace />} />
        <Route
          path='/match/create'
          element={<Navigate to='/create-match' replace />}
        />

        {/* catch-all */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
}
