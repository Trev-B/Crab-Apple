import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex items-center h-full'>
      <Link className='bg-blue-100 rounded px-1 py-1' to='/create-game'>
        Create Game
      </Link>

      <Link className='bg-red-100 rounded px-1 py-1' to='/join-game'>
        Join Game
      </Link>
    </div>
  );
};

export default Home;
