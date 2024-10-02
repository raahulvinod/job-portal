import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const AppliedJobs = () => {
  const { userAuth } = useContext(UserContext);
  const access_token = userAuth?.access_token;
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_DOMAIN}/users/applied-jobs`,
          {},
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        setJobData(data.appliedJobs);
      } catch (err) {
        console.error('Failed to fetch job details', err);
      }
    };

    fetchJobDetails();
  }, [access_token]);

  if (!jobData.length) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="text-gray-700 text-center">
          No job details available.
        </div>
      </div>
    );
  }

  console.log(jobData);

  return (
    <div className="p-6 bg-white rounded-lg max-w-7xl mx-auto space-y-4">
      {jobData.map((appliedJob) => {
        const { jobId, status } = appliedJob;
        const { companyName, jobTitle, jobLocation, employmentType } = jobId;

        return (
          <section key={appliedJob._id}>
            <Link
              to={`/job/${jobId._id}`}
              className="bg-white shadow-xl mb-4 shadow-gray-100 w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-5 py-4 rounded-md"
            >
              <div>
                <span className="text-purple-800 text-sm">{companyName}</span>
                <h3 className="font-bold mt-px">{jobTitle}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                    {employmentType}
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
                    {jobLocation}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="bg-green-600 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center"
                  disabled
                >
                  {status}
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>
            </Link>
          </section>
        );
      })}
    </div>
  );
};

export default AppliedJobs;
