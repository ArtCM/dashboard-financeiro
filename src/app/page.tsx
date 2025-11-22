'use client';

import Header from '@/src/components/Header';
import StatsSection from '@/src/components/StatsSection';
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
      
      <main className="px-6 py-8">
        <StatsSection 
          saldoTotal={data.saldoTotal}
          estatisticas={data.estatisticas}
        />
        
      </main>
    </div>
  );
}


