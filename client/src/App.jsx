import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import UserProvider from './context/userContext';

export default function App() {
  return (
    <>
      <UserProvider>
        <Toaster />
        <Navbar />
        <Outlet />
      </UserProvider>
    </>
  );
}
