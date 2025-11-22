import Image from "next/image";
import { ShoppingBag, UtensilsCrossed, ShoppingCart, Pill, Dumbbell } from "lucide-react";
import { useState } from "react";
import TransactionDetailsModal from "./TransactionDetailsModal";

interface Transacao {
  id: string;
  nome: string;
  valor: number;
  cor: string;
  icone?: string;
}

interface TransacoesRecentesProps {
  transacoes: Transacao[];
}

const TransacoesRecentes = ({ transacoes }: TransacoesRecentesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);

  const getIcon = (iconName?: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
      'shopping_bag': ShoppingBag,
      'restaurant': UtensilsCrossed,
      'shopping_cart': ShoppingCart,
      'local_pharmacy': Pill,
      'fitness_center': Dumbbell
    };
    const IconComponent = iconMap[iconName || 'shopping_cart'] || ShoppingCart;
    return <IconComponent size={17} />;
  };

  return (
    <>
      <div className="w-full rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Image src="/cube.png" alt="Gráfico" width={24} height={24} />
            <h3 className="text-lg font-semibold text-gray-900">Transações recentes</h3>
            <span className="text-gray-400 text-sm">últimos 7 dias</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-blue-500 text-sm hover:text-blue-600"
          >
            Ver tudo
          </button>
        </div>

        <div className="border-t border-[#B3B3B3]">
          {transacoes.map((transacao) => (
            <div key={transacao.id} className="flex items-center justify-between border-b border-[#B3B3B3] py-3 px-2">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center text-gray-700"
                  style={{ backgroundColor: transacao.cor }}
                >
                  {getIcon(transacao.icone)}
                </div>
                <span className="text-gray-900 font-medium">{transacao.nome}</span>
              </div>
              <span className="text-gray-900 font-semibold">
                {formatCurrency(transacao.valor)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <TransactionDetailsModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        transacoes={transacoes}
      />
    </>
  );
};

export default TransacoesRecentes;


