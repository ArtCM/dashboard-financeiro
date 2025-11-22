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

  const transacoesMock = [
    { id: '1', nome: 'Mercadinho da Cidade', valor: 10.98, cor: '#FDFF9D' },
    { id: '2', nome: 'Tenda Nostra', valor: 26.38, cor: '#FF9D9D' },
    { id: '3', nome: 'Farmácia Um', valor: 43.17, cor: '#C8FF9D' },
    { id: '4', nome: 'Academia Body', valor: 69.12, cor: '#AB9DFF' },
    { id: '5', nome: 'ShopOnline', valor: 135.24, cor: '#FF9DEF' },
  ];

  const analiseGeralMock = {
    ganhos: 2789.21,
    saidas: 1278.47,
    itens: [
      { nome: 'Compras', porcentagem: 62, cor: '#FF6B6B' },
      { nome: 'Boletos', porcentagem: 14, cor: '#9B59B6' },
      { nome: 'Investimentos', porcentagem: 5, cor: '#4ECDC4' },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <StatsSection 
          saldoTotal={data.saldoTotal}
          estatisticas={data.estatisticas}
        />

        <div className="bg-white">
          <div className='flex flex-col lg:flex-row justify-between items-start lg:mt-[-100px] lg:gap-24 space-y-6 pt-6 lg:pt-35 pb-10 px-4 lg:px-10 container mx-auto'>
            <TransacoesRecentes transacoes={transacoesMock} />
            <AnaliseGeral
              ganhos={analiseGeralMock.ganhos}
              saidas={analiseGeralMock.saidas}
              itens={analiseGeralMock.itens}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

