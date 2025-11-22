"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";

interface ItemAnalise {
  nome: string;
  porcentagem: number;
  cor: string;
  icone?: string;
  valor?: number;
  categoria?: string;
}

interface AnalysisDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ganhos: number;
  saidas: number;
  itens: ItemAnalise[];
}

const AnalysisDetailsModal = ({ open, onOpenChange, ganhos, saidas, itens }: AnalysisDetailsModalProps) => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);

  const getIconPath = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      'shopping_cart': '/cart.png',
      'receipt': '/boleto.png', 
      'trending_up': '/arrow-up.png'
    };
    return iconMap[iconName] || '/cart.png';
  };

  const saldoLiquido = ganhos - saidas;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <BarChart3 className="h-5 w-5" />
            Análise Geral - Detalhes
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Ganhos</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(ganhos)}</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-800">Saídas</span>
              </div>
              <p className="text-2xl font-bold text-red-900">{formatCurrency(saidas)}</p>
            </div>

            <div className={`p-4 rounded-lg border ${saldoLiquido >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className={`h-5 w-5 ${saldoLiquido >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
                <span className={`text-sm font-medium ${saldoLiquido >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
                  Saldo Líquido
                </span>
              </div>
              <p className={`text-2xl font-bold ${saldoLiquido >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
                {formatCurrency(saldoLiquido)}
              </p>
            </div>
          </div>

          {/* Breakdown por Categoria */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Breakdown por Categoria</h3>
            <div className="space-y-4">
              {itens.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Image 
                        src={getIconPath(item.icone || 'shopping_cart')} 
                        alt={item.nome} 
                        width={24} 
                        height={24} 
                      />
                      <div>
                        <span className="font-medium text-gray-900">{item.nome}</span>
                        {item.categoria && (
                          <div className="text-xs text-gray-500 mt-1">
                            Categoria: {item.categoria}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-gray-900">
                        {item.porcentagem}%
                      </span>
                      {item.valor && (
                        <div className="text-sm text-gray-600">
                          {formatCurrency(item.valor)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: item.cor,
                        width: `${item.porcentagem}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Período de Análise */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Informações do Período</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Período analisado: Últimos 7 dias</p>
              <p>• Total de categorias: {itens.length}</p>
              <p>• Maior categoria: {itens.length > 0 ? itens.reduce((prev, current) => (prev.porcentagem > current.porcentagem) ? prev : current).nome : 'N/A'}</p>
            </div>
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

export default AnalysisDetailsModal;
