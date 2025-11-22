export interface DashboardData {
  dashboard: {
    analysis: {
      breakdown: Array<{
        id: string;
        label: string;
        percentage: number;
        icon: string;
        color: string;
      }>;
      period: string;
      summary: {
        earnings: Record<string, unknown>;
        expenses: Record<string, unknown>;
      };
    };
    balance: {
      currency: string;
      total: number;
      yield: {
        percentage: number;
        period: string;
      };
    };
    recentTransactions: {
      period: string;
      transactions: Array<{
        id: string;
        merchant: string;
        amount: number;
        currency: string;
        category: string;
        color: string;
        icon: string;
      }>;
    };
    statistics: {
      cards: Array<{
        id: string;
        title: string;
        value: number;
        currency: string;
        type: string;
      }>;
      period: string;
    };
  };
}

export interface ProcessedDashboardData {
  saldoTotal: {
    valor: number;
    rendimento: number;
  };
  estatisticas: {
    contaPJ: number;
    recebimentos: number;
    lucro: number;
  };
  transacoes: Array<{
    id: string;
    nome: string;
    valor: number;
    cor: string;
    icone?: string;
  }>;
  analiseGeral: Array<{
    nome: string;
    porcentagem: number;
    cor: string;
    icone?: string;
  }>;
}









