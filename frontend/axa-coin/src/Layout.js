import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar.tsx';
import Footer from './components/footer.tsx';

function Layout() {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== '/login' && <Navbar />}
      <div className="main">
        <Outlet /> 
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
