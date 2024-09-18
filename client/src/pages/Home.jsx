import { useEffect, useState } from 'react';

import Banner from '../components/Banner';
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
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('jobs.json');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs by title and selected category
  const filteredItems = jobs.filter((job) => {
    const matchesQuery = job.jobTitle
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = selectedCategory
      ? job.jobLocation.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesQuery && matchesCategory;
  });

  // Calculate the index range for pagination
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get the filtered and paginated jobs
  const filteredData = () => {
    const { startIndex, endIndex } = calculatePageRange();
    const paginatedJobs = filteredItems.slice(startIndex, endIndex);

    return paginatedJobs.map((data, i) => <Card key={i} data={data} />);
  };

  // Re-calculate result whenever jobs, query, or selectedCategory changes
  const result = filteredData();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when the query changes
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* Main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* Job cards */}
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

          {/* Pagination */}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                className="hover:underline hover:text-blue"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{' '}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                className="hover:underline hover:text-blue"
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
        <div className="bg-white p-4 rounded"></div>
      </div>
    </div>
  );
};

export default Home;
