import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LiaRupeeSignSolid } from 'react-icons/lia';

const JobDetails = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(jobData);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const { job } = await response.json();

        setJobData(job);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  // Handle case where jobData is null (if API returns no data)
  if (!jobData) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="text-gray-700 text-center">
          No job details available.
        </div>
      </div>
    );
  }

  const formattedDate = new Date(jobData.postingDate).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className="p-6 bg-white rounded-lg space-y-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center mb-4">
        <img
          src={jobData.companyLogo}
          alt={`${jobData.companyName} Logo`}
          className="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {jobData.jobTitle}
          </h1>
          <div className="text-sm text-gray-500">{jobData.companyName}</div>
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
          {jobData.employmentType}
        </span>
        <span className="text-slate-600 text-sm flex gap-1 items-center">
          <LiaRupeeSignSolid className="text-purple-700 h-4 w-4" />
          {jobData.minPrice} - {jobData.maxPrice}
        </span>
        <span className="text-slate-600 text-sm flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {jobData.jobLocation}
        </span>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Job Description
      </h2>
      <p className="text-gray-700 mb-4">{jobData.description}</p>

      {/* Experience Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Experience Level
      </h2>
      <p className="text-gray-700 mb-4">{jobData.experienceLevel}</p>

      {/* Skills Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Required Skills
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {(jobData.skills || []).map((skill, index) => (
          <span
            key={index}
            className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex items-center">
        Apply Now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default JobDetails;
