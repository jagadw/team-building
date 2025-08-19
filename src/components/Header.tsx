import { logout } from '../services/authService';
import { useParams } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { slug } = useParams<{ slug: string }>(); // ambil slug dari URL

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <button className="md:hidden text-2xl" onClick={onToggleSidebar}>
        ☰
      </button>
      <h1 className="text-xl font-bold">
        {slug}
      </h1>
      <button onClick={logout} className="text-red-600 inline">
        Logout
      </button>
    </div>
  );
};

export default Header;
