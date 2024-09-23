import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
    </>
  );
}
