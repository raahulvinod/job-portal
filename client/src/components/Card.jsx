import { Link } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import { LiaRupeeSignSolid } from 'react-icons/lia';

const Card = ({ data }) => {
  const {
    companyName,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
    jobTitle,
  } = data;

  const formattedDate = new Date(postingDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="m-5 border-2 border-gray-300 p-5 cursor-pointer">
      <Link to="/" className="flex gap-4 flex-col sm:flex-row items-start">
        <img src={companyLogo} alt="" className="w-16 h-16" />
        <div className="card-details">
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

          <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-2">
              <FiMapPin /> {jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> {employmentType}
            </span>
            <span className="flex items-center gap-1">
              <LiaRupeeSignSolid />
              {minPrice}-{maxPrice}k{' '}
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar /> {formattedDate}
            </span>
          </div>
          <p className="text-base text-primary/70">
            {description.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
