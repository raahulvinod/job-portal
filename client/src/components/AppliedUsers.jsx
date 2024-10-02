import React from 'react';

const AppliedUsers = ({ appliedUsers }) => {
  return (
    <div className="p-1 bg-white rounded-lg max-w-7xl mx-auto space-y-4">
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {appliedUsers.map((user) => (
          <li key={user.id} className="py-3 sm:py-4">
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
                {user.status}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedUsers;
