import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
            <Link to='/login' className='hover:underline'>
              Login
            </Link>
          </li>
          <li>
            <Link to='/profile' className='hover:underline'>
              Profile
            </Link>
          </li>
          <li>
            <Link to='/match' className='hover:underline'>
              Matches
            </Link>
          </li>
          <li>
            <Link to='/match/10' className='hover:underline'>
              Match Details
            </Link>
          </li>
          <li>
            <Link to='/match/create' className='hover:underline'>
              Create Match
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className='md:hidden'>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Overlay style) */}
      {isOpen && (
        <div className='md:hidden mt-3 px-4'>
          <ul className='flex flex-col gap-4 text-lg'>
            <li>
              <Link to='/' onClick={toggleMenu} className='block'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/login' onClick={toggleMenu} className='block'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/profile' onClick={toggleMenu} className='block'>
                Profile
              </Link>
            </li>
            <li>
              <Link to='/match' onClick={toggleMenu} className='block'>
                Matches
              </Link>
            </li>
            <li>
              <Link to='/match/10' onClick={toggleMenu} className='block'>
                Match Details
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
