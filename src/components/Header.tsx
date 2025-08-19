import { logout } from '../services/authService';
import { useParams } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg px-8 py-5 flex justify-between items-center">
      <button
        className="md:hidden text-3xl text-white hover:bg-blue-700 rounded-full p-2 transition duration-200"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <h1 className="text-md md:text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">
        {slug}
      </h1>
      <button
        onClick={logout}
        className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full shadow hover:bg-indigo-50 transition duration-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
