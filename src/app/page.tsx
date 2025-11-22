'use client';

import Header from '@/src/components/Header';
import StatsSection from '@/src/components/StatsSection';
import TransacoesRecentes from '@/src/components/TransacoesRecentes';
import AnaliseGeral from '@/src/components/AnaliseGeral';
import { useDashboardData } from '@/src/hooks/useDashboardData';

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-red-500">Erro: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <StatsSection 
          saldoTotal={data.saldoTotal}
          estatisticas={data.estatisticas}
        />

        <div className="bg-white">
          <div className='flex flex-col lg:flex-row justify-between items-start mt-[-115px] lg:mt-[-100px] lg:gap-24 space-y-6 pt-28 lg:pt-35 pb-10 px-4 lg:px-10 container mx-auto'>
            <TransacoesRecentes transacoes={data.transacoes} />
            <AnaliseGeral
              ganhos={2789.21}
              saidas={1278.47}
              itens={data.analiseGeral}
            />
          </div>
        </div>
      </main>
    </div>
  );
}



