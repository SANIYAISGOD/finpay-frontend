import { Fingerprint } from "lucide-react";

const FinPayLogo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };
  const iconSizes = { sm: 18, md: 24, lg: 36 };

  return (
    <div className="flex items-center gap-2">
      <div className="finpay-gradient rounded-xl p-1.5 finpay-glow">
        <Fingerprint size={iconSizes[size]} className="text-primary-foreground" />
      </div>
      <span className={`${sizes[size]} font-extrabold tracking-tight`}>
        <span className="finpay-gradient-text">Fin</span>
        <span className="text-foreground">Pay</span>
      </span>
    </div>
  );
};

export default FinPayLogo;
