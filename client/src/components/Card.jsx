import { Link } from 'react-router-dom';
import { LiaRupeeSignSolid } from 'react-icons/lia';

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    jobLocation,
    employmentType,
    postingDate,
    jobTitle,
    maxPrice,
    minPrice,
    salaryType,
  } = data;

  const formattedDate = new Date(postingDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section>
      <Link
        to={`job/${_id}`}
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
          <div className="flex items-center gap-2 mt-2">
            <LiaRupeeSignSolid className="text-purple-700 h-4 w-4" />
            <span className="text-slate-600 text-sm">
              {minPrice.toLocaleString('en-IN')} -{' '}
              {maxPrice.toLocaleString('en-IN')} per {salaryType.toLowerCase()}
            </span>
          </div>
        </div>
        <div>
          <button className="bg-purple-900 hover:bg-purple-800 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
            Apply Now
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </Link>
    </section>
  );
};

export default Card;
