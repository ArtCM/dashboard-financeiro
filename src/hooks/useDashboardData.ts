'use client';

import { useState, useEffect } from 'react';
import { DashboardData, ProcessedDashboardData } from '@/src/types/dashboard';

const processApiData = (apiData: DashboardData): ProcessedDashboardData => {
  return {
    saldoTotal: {
      valor: apiData.balance?.total || 0,
      rendimento: apiData.balance?.yield?.percentage || 0,
    },
    estatisticas: {
      contaPJ: apiData.balance?.total || 0,
      recebimentos: apiData.balance?.total * 0.8 || 0,
      lucro: apiData.balance?.total * 0.2 || 0,
    },
  };
};

export const useDashboardData = () => {
  const [data, setData] = useState<ProcessedDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🚀 Iniciando requisição...');
        
        const response = await fetch('https://api.jsonbin.io/v3/b/691b5807d0ea881f40ee8674');
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        
        const result = await response.json();
        console.log('📦 Response completo:', result);
        console.log('📦 Record data:', result.record);
        
        const processedData = processApiData(result.record);
        console.log('🔄 Dados processados:', processedData);
        
        setData(processedData);
      } catch (err) {
        console.error('❌ Erro na requisição:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        console.log('✅ Finalizando loading...');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};




