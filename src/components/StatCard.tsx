import { useToast } from "@/hooks/use-toast";

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard = ({ title, value }: StatCardProps) => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Dados limitados",
      description: "Infelizmente só temos o valor dos últimos 7 dias, estamos trabalhando para conseguir mais dados.",
    });
  };

  return (
    <div className="bg-white py-4 overflow-hidden shadow-sm w-full max-w-[400px] md:max-w-[400px] min-w-[320px] md:min-w-0">
      <div className="px-6 pb-8 flex flex-col gap-4 text-black">
        <p className="text-sm mb-1 font-medium">{title}</p>
        <p className="text-2xl font-medium">{value}</p>
      </div>

      <div className="px-6 py-3 flex items-center justify-between gap-3">
        <button 
          onClick={showToast}
          className="text-[#686868] h-[37px] w-full text-sm hover:bg-gray-100 hover:text-gray-700 border border-[#686868]"
        >
          Ver mais detalhes
        </button>
        <button 
          onClick={showToast}
          className="text-gray-400 h-[37px] w-[46px] hover:bg-gray-100 flex items-center justify-center p-1 border border-[#686868]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
              fill="#292D32"
            />
            <path
              d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
              fill="#292D32"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StatCard;



