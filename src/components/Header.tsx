interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => (
  <div className="md:hidden bg-white shadow px-6 py-4 flex justify-between items-center">
    <button className="md:hidden text-2xl" onClick={onToggleSidebar}>☰</button>
    {/* <h1 className="text-xl font-bold">Team Building</h1> */}
    {/* <span className="text-gray-600 hidden md:inline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus aspernatur itaque atque quod perspiciatis nulla recusandae odit quaerat obcaecati aut accusantium nihil, blanditiis quia, facere iure beatae eum pariatur optio?</span> */}
  </div>
);

export default Header;
