import { useEffect, useState } from 'react';
import axios from 'axios';

import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import Hero from '../components/Hero';
import FilterModal from '../components/FilterModal';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const { jobs } = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/jobs/all-jobs`
        );
        setJobs(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs by title and selected category
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Calculate the index range for pagination
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
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
  const filteredData = (jobs, selectedCategory, query) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filteredItems; // Filter by job title (query)
    }

    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          salaryType,
          experienceLevel,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
          postingDate >= selectedCategory ||
          experienceLevel.toLowerCase() === selectedCategory.toLowerCase() ||
          salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    const { startIndex, endIndex } = calculatePageRange();
    let paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    return {
      paginatedJobs: paginatedJobs.map((data, i) => (
        <Card key={i} data={data} />
      )),
      totalFilteredJobs: filteredJobs.length, // Return the total count of filtered jobs
    };
  };

  // Re-calculate paginated jobs and total filtered jobs whenever jobs, query, or selectedCategory changes
  const { paginatedJobs, totalFilteredJobs } = filteredData(
    jobs,
    selectedCategory,
    query
  );

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
      <Hero query={query} handleInputChange={handleInputChange} />

      {/* Main content */}
      <div className="bg-gray-50 md:grid grid-cols-3 gap-8 lg:px-24 px-4 py-12">
        {/* Job cards */}
        <div className="col-span-2 p-4 rounded">
          <div className="sm:hidden mb-4 flex justify-end">
            <button
              className="bg-purple-900 text-white px-4 py-2 rounded-md"
              onClick={openFilterModal}
            >
              Filter Jobs
            </button>
            {isFilterModalOpen && (
              <FilterModal
                closeFilterModal={closeFilterModal}
                handleChange={handleChange}
                handleClick={handleClick}
              />
            )}
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-12">
              <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
                role="status"
              >
                <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0, 0, 0, 0)">
                  Loading...
                </span>
              </div>
            </div>
          ) : paginatedJobs.length > 0 ? (
            <Jobs result={paginatedJobs} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-4">
                {paginatedJobs.length} Jobs
              </h3>
              <p>No jobs found</p>
            </>
          )}

          {/* Pagination */}
          {totalFilteredJobs > 0 ? (
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
                {Math.ceil(totalFilteredJobs / itemsPerPage)}
              </span>
              <button
                className="hover:underline hover:text-blue"
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(totalFilteredJobs / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
        {/* Filters (Sidebar) */}
        <div className="hidden md:block col-span-1  p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Home;
