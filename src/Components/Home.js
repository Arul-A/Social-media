import React, { useContext } from 'react';
import Feed from './Feed';
import DataContext from '../context/DataContext';

const Home = () => {
  const {searchResults} = useContext(DataContext) 
  return (
    <div className="home">
      {searchResults.length > 0 ? (
        <Feed searchResults={searchResults} />
      ) : (
        <h1 style={{ textAlign: 'center', color:'red',marginTop:'10%'}}>No posts to display</h1>
      )}
    </div>
  );
}

export default Home;
