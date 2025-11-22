"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, DollarSign } from "lucide-react";

interface AddMoneyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddMoneyModal = ({ open, onOpenChange }: AddMoneyModalProps) => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formattedValue;
  };

  const formatCardNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatExpiryDate = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length >= 2) {
      return `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}`;
    }
    return numericValue;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!amount || Number(amount.replace(/\D/g, "")) === 0) {
      newErrors.amount = "Valor é obrigatório";
    }

    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Número do cartão deve ter 16 dígitos";
    }

    if (!expiryDate || expiryDate.length < 5) {
      newErrors.expiryDate = "Data de validade é obrigatória";
    }

    if (!cvv || cvv.length < 3) {
      newErrors.cvv = "CVV deve ter pelo menos 3 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Em desenvolvimento",
        description: "Ainda estamos desenvolvendo esta funcionalidade.",
      });
      onOpenChange(false);
      // Reset form
      setAmount("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <DollarSign className="h-5 w-5" />
            Adicionar Saldo
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Adicione dinheiro à sua conta usando seu cartão de crédito ou débito.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-900">Valor</Label>
            <Input
              id="amount"
              placeholder="R$ 0,00"
              value={amount}
              onChange={(e) => setAmount(formatCurrency(e.target.value))}
              className={`text-gray-600 placeholder:text-gray-400 ${errors.amount ? "border-red-500" : ""}`}
            />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="flex items-center gap-2 text-gray-900">
              <CreditCard className="h-4 w-4" />
              Número do Cartão
            </Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              className={`text-gray-600 placeholder:text-gray-400 ${errors.cardNumber ? "border-red-500" : ""}`}
            />
            {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-gray-900">Validade</Label>
              <Input
                id="expiryDate"
                placeholder="MM/AA"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                maxLength={5}
                className={`text-gray-600 placeholder:text-gray-400 ${errors.expiryDate ? "border-red-500" : ""}`}
              />
              {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-gray-900">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                maxLength={4}
                className={`text-gray-600 placeholder:text-gray-400 ${errors.cvv ? "border-red-500" : ""}`}
              />
              {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-secondary hover:bg-secondary/90">
              Adicionar Saldo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoneyModal;

