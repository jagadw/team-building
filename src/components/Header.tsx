interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => (
  <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
    <button className="md:hidden text-2xl" onClick={onToggleSidebar}>☰</button>
    <h1 className="text-xl font-bold">Team Building</h1>
    <span className="text-red-600 inline">Logout</span>
  </div>
);

export default Header;
