import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='bg-blue-300 flex items-center w-full'>
      <Link className='bg-blue-100 rounded px-1 py-1' to='/'>
        Crab Apple
      </Link>
    </div>
  );
};

export default NavBar;
