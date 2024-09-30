import Location from './Location';
import JobPostingData from './JobPostingData';
import WorkExperience from './WorkExperience';
import EmploymentType from './EmploymentType';

const Sidebar = ({ handleChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Filters
      </h3>

      <Location handleChange={handleChange} />
      <JobPostingData handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
    </div>
  );
};

export default Sidebar;
