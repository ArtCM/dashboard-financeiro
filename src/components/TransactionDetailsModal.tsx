"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag, UtensilsCrossed, ShoppingCart, Pill, Dumbbell, Calendar, DollarSign } from "lucide-react";

interface Transacao {
  id: string;
  nome: string;
  valor: number;
  cor: string;
  icone?: string;
  data?: string;
  categoria?: string;
}

interface TransactionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transacoes: Transacao[];
}

const TransactionDetailsModal = ({ open, onOpenChange, transacoes }: TransactionDetailsModalProps) => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não disponível';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getIcon = (iconName?: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
      'shopping_bag': ShoppingBag,
      'restaurant': UtensilsCrossed,
      'shopping_cart': ShoppingCart,
      'local_pharmacy': Pill,
      'fitness_center': Dumbbell
    };
    const IconComponent = iconMap[iconName || 'shopping_cart'] || ShoppingCart;
    return <IconComponent size={20} />;
  };

  const totalValue = transacoes.reduce((sum, transacao) => sum + transacao.valor, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl px-1 lg:px-6 max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <DollarSign className="h-5 w-5" />
            Transações Recentes - Detalhes
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total de transações:</span>
              <span className="font-semibold text-gray-900">{transacoes.length}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">Valor total:</span>
              <span className="font-semibold text-lg text-gray-900">{formatCurrency(totalValue)}</span>
            </div>
          </div>

          <div className="space-y-3">
            {transacoes.map((transacao) => (
              <div key={transacao.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-900"
                      style={{ backgroundColor: transacao.cor }}
                    >
                      {getIcon(transacao.icone)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{transacao.nome}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(transacao.data)}</span>
                        </div>
                        {transacao.categoria && (
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                            {transacao.categoria}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">
                      {formatCurrency(transacao.valor)}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      ID: {transacao.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => onOpenChange(false)} className="bg-primary text-white hover:bg-primary/90">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsModal;

