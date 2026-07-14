import Navbar from '@/modules/shared/Navbar';
import MainLayout from '@/layouts/MainLayout';
import { Outlet } from 'react-router-dom';
import Footer from '@/modules/shared/Footer';

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Footer />
    </div>
  );
}

export default App;
