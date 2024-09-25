import React from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi';

const Hero = ({ query, handleInputChange }) => {
  return (
    <section className="py-2 sm:py-4 lg:pt-8 xl:pb-0 z-0">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-full font-pj">
            Discover Your Next Career with JobHatch
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
            Connecting Talent with Opportunity
          </h1>
          <p className="max-w-md mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
            We help you find your dream job. Whether you're an experienced
            professional or just starting out, explore thousands of job listings
            and connect with top employers looking for talents like you.
          </p>

          <div className="relative inline-flex mt-10 group">
            <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

            <button className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
              Start Your Job Search
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20 py-2">
        <img
          className="object-cover object-top w-full h-auto mx-auto scale-150 2xl:max-w-screen-2xl xl:scale-100"
          src="images/Hero1.jpg"
          alt="Hero Illustration"
        />
      </div>

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
              onChange={handleInputChange}
              value={query}
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
