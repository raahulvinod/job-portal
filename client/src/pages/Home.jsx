import { useState } from 'react';

import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <Newsletter />
    </div>
  );
};

export default Home;
