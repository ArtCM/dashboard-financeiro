import StatCard from './StatCard';
import { ProcessedDashboardData } from '@/src/types/dashboard';
import Image from 'next/image';

interface StatsSectionProps {
  saldoTotal?: ProcessedDashboardData['saldoTotal'];
  estatisticas?: ProcessedDashboardData['estatisticas'];
}

const StatsSection = ({ saldoTotal, estatisticas }: StatsSectionProps) => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);

  if (!saldoTotal || !estatisticas) {
    return (
      <div className="space-y-6">
        <div className="text-gray-400">Carregando dados...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 lg:px-10 container mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-md mb-2 font-medium">Saldo total</p>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-medium">{formatCurrency(saldoTotal.valor)}</h2>
            <div className="flex items-center gap-3">
              <Image src="/thunder.png" alt="Rendimento" width={24} height={24} />
              <span className="text-sm">rendendo {saldoTotal.rendimento}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-secondary font-medium w-[254px] h-[37px] text-white px-3 py-3 flex items-center gap-2 text-sm">
            <span className='w-1/4 justify-start'>
              <Image src="/send.png" alt="Adicionar" width={24} height={24} />
            </span>
            Enviar dinheiro
          </button>
          <button className="bg-secondary max-w-[56px] max-h-[37px] flex items-center justify-center text-white px-4 py-3">
            <Image src="/add.png" alt="Adicionar" width={24} height={24} />
          </button>
        </div>
      </div>

      <div className='mt-10'>
        <div className="flex items-center gap-3 mb-6">
          <Image src="/bubble.png" alt="Gráfico" width={24} height={24} />
          <h1 className="text-lg">Painel de estatísticas</h1>
          <span className="text-light-text text-sm">últimos 7 dias</span>
        </div>

        <div className="flex justify-between gap-6">
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
    </div>
  );
};

export default StatsSection;



