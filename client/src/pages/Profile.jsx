import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import AppliedJobs from '../components/AppliedJobs';

const Profile = () => {
  const { userAuth } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('summary'); // Set initial tab

  // Function to render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return <div>Profile Summary Content</div>;
      case 'appliedJobs':
        return <AppliedJobs />;
      case 'jobAlerts':
        return <div>Job Alerts Content</div>;
      default:
        return <div>Profile Summary Content</div>;
    }
  };

  return (
    <div className="flex flex-col w-full container mx-auto xl:px-24 px-4 min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
      <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
        <div className="flex flex-wrap mb-6 xl:flex-nowrap">
          <div className="mb-5 mr-5">
            <div className="inline-block shrink-0 rounded-2xl">
              <img
                className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                alt="Profile"
              />
            </div>
          </div>
          <div className="grow">
            <div className="flex flex-wrap items-start justify-between mb-2">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <a
                    className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1"
                    href="javascript:void(0)"
                  >
                    {userAuth.fullname}
                  </a>
                </div>
                <div className="flex flex-wrap pr-2 mb-4 font-medium">
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
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </span>
                    {userAuth?.email}
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
                activeTab === 'summary'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted'
              } hover:border-primary`}
              onClick={() => setActiveTab('summary')}
            >
              Profile Summary
            </button>
          </li>
          <li className="flex mt-2 -mb-[2px]">
            <button
              className={`py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 ${
                activeTab === 'appliedJobs'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted'
              } hover:border-primary`}
              onClick={() => setActiveTab('appliedJobs')}
            >
              Applied Jobs
            </button>
          </li>
          <li className="flex mt-2 -mb-[2px]">
            <button
              className={`py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 ${
                activeTab === 'jobAlerts'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted'
              } hover:border-primary`}
              onClick={() => setActiveTab('jobAlerts')}
            >
              Job Alerts
            </button>
          </li>
        </ul>

        {/* Render Tab Content */}
        <div className="tab-content mt-5">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
