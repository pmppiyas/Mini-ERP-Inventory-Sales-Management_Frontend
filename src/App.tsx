import Navbar from '@/pages/shared/Navbar';
import './App.css';
import MainLayout from '@/layouts/MainLayout';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}

export default App;
