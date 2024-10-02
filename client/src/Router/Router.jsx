import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../pages/Home';
import About from '../pages/About';
import CreateJob from '../pages/CreateJob';
import MyJobs from '../pages/MyJobs';
import UpdateJob from '../pages/UpdateJob';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../pages/Profile';
import Discover from '../pages/Discover';
import JobDetails from '../pages/JobDetails';
import JobApplicants from '../pages/JobApplicants';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      {
        path: '/post-job',
        element: (
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my-job',
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: '/discover',
        element: (
          <ProtectedRoute>
            <Discover />
          </ProtectedRoute>
        ),
      },
      {
        path: '/edit-job/:id',
        element: <UpdateJob />,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:8000/api/jobs/${params.id}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch job data');
          }

          return response.json();
        },
      },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/job/:id',
        element: (
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        ),
      },
      { path: '/my-job/:jobId', element: <JobApplicants /> },
    ],
  },
]);

export default router;
