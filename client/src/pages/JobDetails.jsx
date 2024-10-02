import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const { userAuth } = useContext(UserContext);
  const access_token = userAuth?.access_token;

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [hasApplied, setHasApplied] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/jobs/${id}`
        );
        setJobData(data.job);
      } catch (err) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!access_token) return;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/users/user`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        const appliedJobs = data.user.appliedJobs;
        const applied = appliedJobs.some((job) => job.jobId.toString() === id);
        setHasApplied(applied);

        if (applied) {
          setApplicationMessage(
            'You have already submitted your application for this position.'
          );
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, [access_token, id]);

  useEffect(() => {
    if (jobData?.postedBy === userAuth?._id) {
      setIsAdmin(true);
      setApplicationMessage('You cannot apply for your own job posting.');
    }
  }, [jobData, userAuth]);

  const handleApplyJob = async () => {
    if (isAdmin) return;

    setApplying(true);
    setApplicationMessage('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/jobs/apply/${id}`,
        {},
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      if (response.status === 200) {
        toast.success('Job application successful!');
        setHasApplied(true);
        setApplicationMessage('Job application successful!');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to apply for the job.';
      setApplicationMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-8 w-8" />
      </div>
    );
  }

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
    <div className="p-6 bg-white rounded-lg max-w-7xl mx-auto space-y-4">
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
          {`${jobData.minPrice.toLocaleString(
            'en-IN'
          )} - ${jobData.maxPrice.toLocaleString('en-IN')}`}
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

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Experience Level
      </h2>
      <p className="text-gray-700 mb-4">{jobData.experienceLevel}</p>

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

      <button
        className={`${
          hasApplied ? 'bg-green-600' : 'bg-purple-900'
        } text-white font-medium px-4 py-2 rounded-md flex items-center ${
          hasApplied || isAdmin ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleApplyJob}
        disabled={applying || hasApplied || isAdmin}
      >
        {hasApplied ? 'Applied' : applying ? 'Applying...' : 'Apply Now'}
        {!applying && !hasApplied && (
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
        )}
      </button>

      {applicationMessage && (
        <div className={`${isAdmin ? 'text-red-600' : 'text-green-500'} mt-2`}>
          {applicationMessage}
        </div>
      )}
    </div>
  );
};

export default JobDetails;
