import { useState } from 'react';
import StatCard from './StatCard';
import AddMoneyModal from './AddMoneyModal';
import { ProcessedDashboardData } from '@/src/types/dashboard';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface StatsSectionProps {
  saldoTotal?: ProcessedDashboardData['saldoTotal'];
  estatisticas?: ProcessedDashboardData['estatisticas'];
}

const StatsSection = ({ saldoTotal, estatisticas }: StatsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);

  const handlePlusButtonClick = () => {
    toast({
      title: "Em desenvolvimento",
      description: "Ainda estamos desenvolvendo esta funcionalidade.",
    });
  };

  if (!saldoTotal || !estatisticas) {
    return (
      <div className="space-y-6">
        <div className="text-gray-400">Carregando dados...</div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 px-4 lg:px-10 pt-16 container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className='flex items-center justify-center lg:items-start flex-col'>
            <p className="text-md mb-2 font-medium">Saldo total</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h2 className="text-4xl text-center py-4 lg:py-0 lg:text-left font-medium">{formatCurrency(saldoTotal.valor)}</h2>
              <div className="flex items-center gap-3">
                <Image src="/thunder.png" alt="Rendimento" width={24} height={24} />
                <span className="text-sm">rendendo {saldoTotal.rendimento}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-row items-center pt-5 lg:pt-0 justify-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-secondary font-medium w-[204px] lg:w-[254px] h-[37px] text-white px-3 py-3 flex items-center justify-center gap-2 text-sm"
            >
              <span className='flex justify-start'>
                <Image src="/send.png" alt="Adicionar" width={24} height={24} />
              </span>
              Enviar dinheiro
            </button>
            <button 
              onClick={handlePlusButtonClick}
              className="bg-secondary w-[56px] h-[37px] flex items-center justify-center text-white px-4 py-3"
            >
              <Image src="/add.png" alt="Adicionar" width={24} height={24} />
            </button>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex-none snap-center">
              <StatCard 
                title="Conta PJ" 
                value={formatCurrency(estatisticas.contaPJ)} 
              />
            </div>
            <div className="flex-none snap-center">
              <StatCard 
                title="Recebimentos" 
                value={formatCurrency(estatisticas.recebimentos)} 
              />
            </div>
            <div className="flex-none snap-center">
              <StatCard 
                title="Lucro" 
                value={formatCurrency(estatisticas.lucro)} 
              />
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Conta PJ" 
            value={formatCurrency(estatisticas.contaPJ)} 
          />
          <StatCard 
            title="Recebimentos" 
            value={formatCurrency(estatisticas.recebimentos)} 
          />
          <StatCard 
            title="Lucro" 
            value={formatCurrency(estatisticas.lucro)} 
          />
        </div>
      </div>

      <AddMoneyModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  );
};

export default StatsSection;


