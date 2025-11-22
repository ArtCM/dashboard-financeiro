import { Bell } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  const navItems = ['Dashboard', 'Pagamentos', 'Invoices', 'Insights'];

  return (
    <header className="flex items-center justify-between p-6 bg-background">
      <Image src="/logo.png" alt="Logo" width={87} height={30} />
      <nav className="flex gap-6">
        {navItems.map((item, index) => (
          <button
            key={item}
            className={`px-4 py-2 font-medium transition-colors ${
              index === 0
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <button className="p-2 text-gray-300 hover:text-white transition-colors">
        <Bell size={24} />
      </button>
    </header>
  );
};

export default Header;
