import { TrendingUp } from 'lucide-react';
import Card from './Card';
import { ProcessedDashboardData } from '@/src/types/dashboard';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">Saldo total</p>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-bold">{formatCurrency(saldoTotal.valor)}</h2>
            <div className="flex items-center gap-1 text-warning">
              <TrendingUp size={16} />
              <span className="text-sm">rendendo {saldoTotal.rendimento}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-secondary text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
            <span>✈️</span>
            Enviar dinheiro
          </button>
          <button className="bg-secondary text-white px-4 py-3 rounded-lg">
            +
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-primary">📊</span>
          <h3 className="text-lg font-semibold">Painel de estatísticas</h3>
          <span className="text-gray-400 text-sm">últimos 7 dias</span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Card>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Conta PJ</p>
              <p className="text-2xl font-bold">{formatCurrency(estatisticas.contaPJ)}</p>
              <button className="text-gray-400 text-sm hover:text-white transition-colors">
                Ver mais detalhes
              </button>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Recebimentos</p>
              <p className="text-2xl font-bold">{formatCurrency(estatisticas.recebimentos)}</p>
              <button className="text-gray-400 text-sm hover:text-white transition-colors">
                Ver mais detalhes
              </button>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Lucro</p>
              <p className="text-2xl font-bold">{formatCurrency(estatisticas.lucro)}</p>
              <button className="text-gray-400 text-sm hover:text-white transition-colors">
                Ver mais detalhes
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;


