import React from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi';

const Hero = ({ query, handleInputChange }) => {
  return (
    <section className="py-2 sm:py-4 lg:pt-8 xl:pb-0 z-0">
      <section>
        <div className="font-sans">
          <div className="grid lg:grid-cols-2 items-center lg:gap-y-6 bg-blue-500">
            <div className="max-lg:order-1 max-lg:text-center sm:p-12 p-4">
              <h2 className="text-gray-800 lg:text-5xl text-3xl font-bold lg:!leading-[56px]">
                Connecting Talent with Opportunity
              </h2>
              <p className="text-gray-800 mt-6 text-base leading-relaxed">
                We help you find your dream job. Whether you're an experienced
                professional or just starting out, explore thousands of job
                listings and connect with top employers looking for talents like
                you.
              </p>
              <button
                type="button"
                className="bg-transparent border-2 border-gray-800 mt-12 transition-all text-gray-800 font-bold text-sm rounded-md px-6 py-2.5"
              >
                Start your job search
              </button>
            </div>

            <div className="lg:h-[480px] flex items-center">
              <img
                src="https://readymadeui.com/team-image.webp"
                className="w-full h-full object-cover"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <form className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-8 py-14 md:mt-8">
        <div className="flex justify-start md:flex-row flex-col md:gap-1 gap-4">
          {/* Job Position Input */}
          <div className="flex items-center md:rounded-s-md shadow-sm ring-1 ring-gray-800 focus-within:ring-gray-950 md:w-1/2 w-full">
            <FiSearch className="ml-3 text-gray-800" />
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleInputChange}
              value={query}
              placeholder="What position are you looking for?"
              className="block flex-1 border-none outline-none bg-transparent py-2 pl-2 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center md:rounded-s-none shadow-sm ring-1 ring-gray-800 focus-within:ring-gray-950 md:w-1/3 w-full">
            <FiMapPin className="ml-3 text-gray-800" />
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              className="block flex-1 border-none outline-none bg-transparent py-2 pl-2 pr-4 text-gray-300 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default Hero;
