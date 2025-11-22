import { Bell, Menu, BellOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const navItems = ['Dashboard', 'Pagamentos', 'Invoices', 'Insights'];

  const handleNavClick = (item: string) => {
    if (item !== 'Dashboard') {
      toast({
        title: "Em desenvolvimento",
        description: "Esta funcionalidade ainda está em desenvolvimento.",
      });
    }
    setIsMenuOpen(false);
  };

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
            onClick={() => handleNavClick(item)}
          >
            {item}
          </Button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="p-2 text-gray-300 hover:text-white hover:bg-transparent transition-colors"
            >
              <Bell size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BellOff className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma notificação
              </h3>
              <p className="text-sm text-gray-500">
                Você não tem notificações no momento.
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
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
                  onClick={() => handleNavClick(item)}
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

