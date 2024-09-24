import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../pages/Home';
import About from '../pages/About';
import CreateJob from '../pages/CreateJob';
import MyJobs from '../pages/MyJobs';
import SalaryPage from '../pages/SalaryPage';
import UpdateJob from '../pages/UpdateJob';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';

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
        path: '/salary',
        element: (
          <ProtectedRoute>
            <SalaryPage />
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
    ],
  },
]);

export default router;
