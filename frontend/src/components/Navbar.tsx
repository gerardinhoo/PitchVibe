import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getToken, logout } from '../api/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const authed = !!getToken();

  const doLogout = () => {
    logout();
    nav('/');
  };

  return (
    <nav className='bg-indigo-600 text-white px-4 py-3'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link to='/' className='flex items-center space-x-2 md:space-x-3'>
          <img
            src='/PitchVibe-logo.png'
            alt='PitchVibe logo'
            className='w-10 h-10 object-contain'
          />
          <span className='text-2xl font-bold text-white leading-tight'>
            PitchVibe
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className='hidden md:flex gap-6 items-center'>
          <li>
            <Link to='/' className='hover:underline'>
              Home
            </Link>
          </li>
          <li>
            {authed ? (
              <button onClick={doLogout} className='hover:underline'>
                Logout
              </button>
            ) : (
              <Link to='/login' className='hover:underline'>
                Login
              </Link>
            )}
          </li>
          <li>
            <Link to='/profile' className='hover:underline'>
              Profile
            </Link>
          </li>
          <li>
            <Link to='/matches' className='hover:underline'>
              Matches
            </Link>
          </li>
          <li>
            <Link to='/create-match' className='hover:underline'>
              Create Match
            </Link>
          </li>
          <li>
            <Link to='/admin/matches' className='hover:underline'>
              Admin Matches
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen((v) => !v)} className='md:hidden'>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden mt-3 px-4'>
          <ul className='flex flex-col gap-4 text-lg'>
            <li>
              <Link to='/' onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/login' onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link to='/profile' onClick={() => setIsOpen(false)}>
                Profile
              </Link>
            </li>
            <li>
              <Link to='/matches' onClick={() => setIsOpen(false)}>
                Matches
              </Link>
            </li>
            <li>
              <Link to='/create-match' onClick={() => setIsOpen(false)}>
                Create Match
              </Link>
            </li>
            <li>
              <Link to='/admin/matches' onClick={() => setIsOpen(false)}>
                Admin Matches
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
