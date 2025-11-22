'use client';

import { useState, useEffect } from 'react';
import { DashboardData, ProcessedDashboardData } from '@/src/types/dashboard';

const processApiData = (apiData: DashboardData): ProcessedDashboardData => {
  const analiseGeral = apiData.dashboard?.analysis?.breakdown?.map((item) => ({
    nome: item.label || 'Item',
    porcentagem: item.percentage || 0,
    cor: item.color || '#FF6B6B',
    icone: item.icon || 'shopping_cart'
  })) || [];

  const transacoes = apiData.dashboard?.recentTransactions?.transactions?.map((item) => ({
    id: item.id || '',
    nome: item.merchant || 'Transação',
    valor: item.amount || 0,
    cor: item.color || '#FF6B6B',
    icone: item.icon || 'shopping_cart'
  })) || [];

  const cards = apiData.dashboard?.statistics?.cards || [];

  return {
    saldoTotal: {
      valor: apiData.dashboard?.balance?.total || 0,
      rendimento: apiData.dashboard?.balance?.yield?.percentage || 0,
    },
    estatisticas: {
      contaPJ: cards.find((card) => card.type === 'account')?.value || 0,
      recebimentos: cards.find((card) => card.type === 'income')?.value || 0,
      lucro: cards.find((card) => card.type === 'profit')?.value || 0,
    },
    transacoes,
    analiseGeral
  };
};

export const useDashboardData = () => {
  const [data, setData] = useState<ProcessedDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/691b5807d0ea881f40ee8674');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        
        const result = await response.json();

        console.log('📦 Response completo:', result);
        console.log('📦 Record data:', result.record);
        
        const processedData = processApiData(result.record);
        setData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};













