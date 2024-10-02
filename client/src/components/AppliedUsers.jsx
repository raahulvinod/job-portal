import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const AppliedUsers = ({ appliedUsers, setAppliedUsers }) => {
  const { jobId } = useParams();
  const { userAuth } = useContext(UserContext);
  const access_token = userAuth?.access_token;

  const [successMessage, setSuccessMessage] = useState('');

  const handleStatusChange = async (userId, jobId, newStatus, name) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/users/update-status/${jobId}`,
        {
          status: newStatus,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // Update success message
      setSuccessMessage(`Status updated to ${newStatus} for ${name}.`);

      setAppliedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.log(error);
      setSuccessMessage('Error updating status. Please try again.');
    }
  };

  return (
    <div className="p-1 bg-white rounded-lg max-w-7xl mx-auto space-y-4">
      {successMessage && (
        <div className="mb-4 text-green-600">{successMessage}</div>
      )}
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {appliedUsers.map((user) => (
          <li key={user.userId} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg'
                  }
                  alt={`${user.name} image`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </p>
              </div>
              <button className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                View Profile
              </button>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <select
                  value={user.status}
                  onChange={(e) =>
                    handleStatusChange(
                      user.userId,
                      jobId,
                      e.target.value,
                      user.name
                    )
                  }
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="Applied">Applied</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Selected">Selected</option>
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedUsers;
