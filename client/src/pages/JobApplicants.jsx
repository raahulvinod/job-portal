import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppliedUsers from '../components/AppliedUsers';

const JobApplicants = () => {
  const { jobId } = useParams();
  const { userAuth } = useContext(UserContext);
  const access_token = userAuth?.access_token;

  const [appliedUsers, setAppliedUsers] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedUsers = async () => {
      if (!access_token || !jobId) return;

      try {
        setLoading(true);
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_DOMAIN}/jobs/applicants/${jobId}`,
          {},
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        setCompanyDetails(data);
        setAppliedUsers(data.appliedUsers);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch applied users.');
        setLoading(false);
        console.error('Error fetching applied users:', error);
      }
    };

    fetchAppliedUsers();
  }, [access_token, jobId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appliedUsers':
        return (
          <div className="flex items-center justify-center py-8">
            <AppliedUsers
              appliedUsers={appliedUsers}
              setAppliedUsers={setAppliedUsers}
            />
          </div>
        );
      case 'shortList':
        return (
          <div className="flex items-center justify-center py-8">
            No short lists found
          </div>
        );
      default:
        return (
          <AppliedUsers
            appliedUsers={appliedUsers}
            setAppliedUsers={setAppliedUsers}
          />
        );
    }
  };

  const postingDate = new Date(companyDetails.postingDate).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className="flex flex-col w-full container mx-auto xl:px-24 px-4 min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
      <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
        <div className="flex flex-wrap mb-6 xl:flex-nowrap">
          <div className="mb-5 mr-5">
            <div className="inline-block shrink-0 rounded-2xl">
              <img
                className="inline-block shrink-0 rounded-2xl w-[40px] h-[40px] lg:w-[80px] lg:h-[80px]"
                src={companyDetails.companyLogo}
                alt="Profile"
              />
            </div>
          </div>
          <div className="grow">
            <div className="flex flex-wrap items-start justify-between mb-1">
              <div className="flex flex-col">
                <div className="flex items-center mb-1">
                  <a
                    className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1"
                    href="javascript:void(0)"
                  >
                    {companyDetails.companyName}
                  </a>
                </div>
                <div className="flex flex-wrap pr-2 mb-1 font-medium">
                  <a
                    className="flex items-center mb-1 mr-5 text-secondary-dark hover:text-primary"
                    href="javascript:void(0)"
                  >
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a3 3 0 013-3h10a3 3 0 013 3v2h1a1 1 0 011 1v11a3 3 0 01-3 3H5a3 3 0 01-3-3V7a1 1 0 011-1h1V4zm2 0v2h12V4a1 1 0 00-1-1H7a1 1 0 00-1 1zM4 8v10a1 1 0 001 1h14a1 1 0 001-1V8H4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {companyDetails.employmentType}
                  </a>
                </div>

                <div className="flex flex-wrap pr-2 mb-1 font-medium">
                  <a
                    className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                    href="javascript:void(0)"
                  >
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 011 1v1h10V3a1 1 0 112 0v1h1a3 3 0 013 3v12a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h1V3a1 1 0 011-1zM4 9v10a1 1 0 001 1h14a1 1 0 001-1V9H4zm5 3a1 1 0 000 2h6a1 1 0 100-2H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {postingDate}
                  </a>
                </div>

                <div className="flex flex-wrap pr-2 mb-1 font-medium">
                  <a
                    className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                    href="javascript:void(0)"
                  >
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C8.686 2 6 4.686 6 8c0 4.418 4.158 9.151 5.568 10.719a1.5 1.5 0 002.864 0C13.842 17.151 18 12.418 18 8c0-3.314-2.686-6-6-6zm0 4a2 2 0 110 4 2 2 0 010-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {companyDetails.jobLocation}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <hr className="w-full h-px border-neutral-200" />
        <ul className="group flex flex-wrap items-stretch text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments">
          <li className="flex mt-2 -mb-[2px]">
            <button
              className={`py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 ${
                activeTab === 'appliedJobs'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted'
              } hover:border-primary`}
              onClick={() => setActiveTab('appliedJobs')}
            >
              Job Applicants
            </button>
          </li>
          <li className="flex mt-2 -mb-[2px]">
            <button
              className={`py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 ${
                activeTab === 'shortList'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted'
              } hover:border-primary`}
              onClick={() => setActiveTab('shortList')}
            >
              Short Lists
            </button>
          </li>
        </ul>

        {/* Render Tab Content */}
        <div className="tab-content mt-5">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default JobApplicants;
