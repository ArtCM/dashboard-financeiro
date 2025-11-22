export interface DashboardData {
  dashboard: {
    analysis: {
      breakdown: Array<Record<string, unknown>>;
      period: string;
      summary: {
        earnings: Record<string, unknown>;
        expenses: Record<string, unknown>;
      };
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
    transactions: Array<Record<string, unknown>>;
  };
  statistics: {
    cards: Array<Record<string, unknown>>;
    period: string;
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
}
