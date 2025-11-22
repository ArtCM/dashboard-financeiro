import { Bell, Menu } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['Dashboard', 'Pagamentos', 'Invoices', 'Insights'];

  return (
    <header className="flex items-center justify-between p-4 lg:p-6 bg-background">
      <Image src="/logo.png" alt="Logo" width={87} height={30} />
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-6">
        {navItems.map((item, index) => (
          <Button
            key={item}
            variant="ghost"
            className={`px-4 py-2 font-medium transition-colors rounded ${
              index === 0
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'text-gray-300 hover:text-white hover:bg-transparent'
            }`}
          >
            {item}
          </Button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="p-2 text-gray-300 hover:text-white hover:bg-transparent transition-colors"
        >
          <Bell size={24} />
        </Button>
        
        {/* Mobile Menu Sheet */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-transparent transition-colors"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-gray-700 pt-8 px-4">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item, index) => (
                <Button
                  key={item}
                  variant="ghost"
                  className={`px-4 py-3 font-medium transition-colors text-left justify-start rounded ${
                    index === 0
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'text-gray-300 hover:text-white hover:bg-transparent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;



