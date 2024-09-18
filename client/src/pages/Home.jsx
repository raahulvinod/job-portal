import { useEffect, useState } from 'react';

import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch('jobs.json').then((res) => res.json().then((data) => setJobs(data)));
    setIsLoading(false);
  }, []);

  // filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job?.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // side radio filter
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Button based filter
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Main filter
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = filteredItems;

    if (query) {
      filteredJobs = filteredItems;
    }
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
    }

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* Main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/*  Job cards */}
        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? (
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-4">{result.length} Jobs</h3>
              <p>No jobs found</p>
            </>
          )}
        </div>
        <div className="bg-white p-4 rounded"></div>
      </div>
    </div>
  );
};

export default Home;
