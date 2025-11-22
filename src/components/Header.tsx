import { Bell } from 'lucide-react';

const Header = () => {
  const navItems = ['Dashboard', 'Pagamentos', 'Invoices', 'Insights'];

  return (
    <header className="flex items-center justify-between p-6 bg-background">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold text-primary">BigBang</h1>
        
        <nav className="flex gap-6">
          {navItems.map((item, index) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                index === 0
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <button className="p-2 text-gray-300 hover:text-white transition-colors">
        <Bell size={24} />
      </button>
    </header>
  );
};

export default Header;
