import Image from "next/image";

interface ItemAnalise {
  nome: string;
  porcentagem: number;
  cor: string;
}

interface AnaliseGeralProps {
  ganhos: number;
  saidas: number;
  itens: ItemAnalise[];
}

const AnaliseGeral = ({ ganhos, saidas, itens }: AnaliseGeralProps) => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);

  return (
    <div className="w-full rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Image src="/general-analytics.png" alt="Gráfico" width={24} height={24} />
          <h3 className="text-lg font-semibold text-gray-900">Análise geral</h3>
          <span className="text-gray-400 text-sm">últimos 7 dias</span>
        </div>
        <button className="text-blue-500 text-sm hover:text-blue-600">
          Ver tudo
        </button>
      </div>

      <div className="flex justify-between mb-6 border-y py-5 px-3 border-[#B3B3B3]">
        <div>
          <p className="text-gray-500 text-sm mb-1">Ganhos</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(ganhos)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">Saídas</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(saidas)}</p>
        </div>
      </div>

      <div className="space-y-4">
        {itens.map((item, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.cor }}
                />
                <span className="text-gray-700 text-sm">{item.nome}</span>
              </div>
              <span className="text-gray-900 font-semibold text-sm">
                {item.porcentagem}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full"
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
  );
};

export default AnaliseGeral;