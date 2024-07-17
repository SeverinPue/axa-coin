import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar.tsx';

function Layout() {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== '/login' && <Navbar />}
      <div className="main">
        <Outlet /> 
      </div>
    </div>
  );
}

export default Layout;
