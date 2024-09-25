import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';
import { UserContext } from '../context/userContext';
import { removeFromSession } from '../utils/sessions';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);

  const handleMenuToggler = () => {
    setisMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    removeFromSession('user');
    removeFromSession('token');
    setUserAuth({ access_token: null });
  };

  const navItems = [
    { path: '/', title: 'Start a search' },
    { path: '/my-job', title: 'My Jobs' },
    { path: '/discover', title: 'Discover' },
    { path: '/post-job', title: 'Post A Job' },
  ];

  return (
    <header className="relative py-4 md:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              {/* <img
                className="w-auto h-8"
                src="https://d33wubrfki0l68.cloudfront.net/682a555ec15382f2c6e7457ca1ef48d8dbb179ac/f8cd3/images/logo.svg"
                alt="Logo"
              /> */}
              <h1 className="w-auto text-2xl font-bold">JobHatch</h1>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-900"
              onClick={handleMenuToggler}
            >
              {isMenuOpen ? (
                <FaXmark className="w-7 h-7" />
              ) : (
                <FaBarsStaggered className="w-7 h-7" />
              )}
            </button>
          </div>

          {/* Centered Navigation Items */}
          <div className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2">
            {navItems.map(({ path, title }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-900 font-semibold transition duration-200 hover:text-opacity-75'
                    : 'text-gray-700 text-base font-medium transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2'
                }
              >
                {title}
              </NavLink>
            ))}
          </div>

          {/* Authenticated Links */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            {userAuth?.access_token ? (
              <ProfileDropdown
                fullname={userAuth.fullname}
                handleLogout={handleLogout}
              />
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white"
                  role="button"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="bg-gray-900 text-white py-5 px-2 rounded-md lg:hidden">
            <ul className="flex flex-col space-y-4">
              {navItems.map(({ path, title }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? 'font-semibold'
                        : 'text-white transition duration-200 hover:text-opacity-75'
                    }
                    onClick={() => setisMenuOpen(false)} // Close menu on link click
                  >
                    {title}
                  </NavLink>
                </li>
              ))}
              {userAuth?.access_token ? (
                <>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white transition duration-200 hover:text-opacity-75"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="text-white transition duration-200 hover:text-opacity-75"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="text-white transition duration-200 hover:text-opacity-75"
                  >
                    Log in
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
