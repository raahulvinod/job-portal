import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 4;

  const navigate = useNavigate();

  const { userAuth } = useContext(UserContext);
  const access_token = userAuth?.access_token;

  useEffect(() => {
    if (!access_token) {
      toast.error('Access token is missing, please log in again.');

      return;
    }
  }, [access_token]);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          import.meta.env.VITE_SERVER_DOMAIN + '/jobs/my-jobs',
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (response.status !== 201) {
        }

        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching job:', error.message);
        toast.error('Error fetching jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [access_token]);

  // Pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  // Next page and Previous page
  const nextPage = () => {
    if (indexOfLastItem < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = () => {
    const filteredJobs = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setJobs(filteredJobs);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      console.log(access_token);
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_SERVER_DOMAIN}/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success('Job deleted successfully!');

          setJobs(jobs.filter((job) => job._id !== jobId));
        }
      } catch (error) {
        if (error.response) {
          console.error('Error deleting job:', error.response.data.message);
          toast.error(`Error: ${error.response.data.message}`);
        } else {
          console.error('Error deleting job:', error.message);
          toast.error('Error deleting job. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="my-jobs-container">
        <h1 className="text-center p-4 font-semibold">All My Jobs</h1>
        <div className="search-box p-2 text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            name="search"
            id="search"
            className="py-2 p1-3 border border-gray-900 lg:w-6/12 mb-4 w-full rounded-md"
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="relative ml-2 inline-flex items-center justify-center px-8 py-2 text-lg font-semibold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Search
          </button>
        </div>
      </div>
      {/* List of jobs */}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Jobs
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/post-job">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Post A New Job
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Title
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Company Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Salary
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                {isLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center h-20">
                        Loading...
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {job.jobTitle}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {job.companyName}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          ₹ {job.minPrice}-{job.maxPrice}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          <button>
                            <Link to={`/edit-job/${job._id}`}>Edit</Link>
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="bg-gray-900 hover:bg-gray-600 py-2 px-6 text-white rounded-full"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center text-black space-x-8 mb-8">
          {currentPage > 1 && (
            <button className="hover:underline" onClick={prevPage}>
              Previous
            </button>
          )}
          {indexOfLastItem < jobs.length && (
            <button className="hover:underline" onClick={nextPage}>
              Next
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyJobs;
