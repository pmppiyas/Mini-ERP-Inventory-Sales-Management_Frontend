import Navbar from '@/modules/shared/Navbar';
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
