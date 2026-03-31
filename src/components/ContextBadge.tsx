import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertCircle, Repeat } from "lucide-react";

type ContextType = "frequent" | "new_pattern" | "trending" | "unusual";

interface ContextBadgeProps {
  type: ContextType;
  className?: string;
}

const config: Record<ContextType, { icon: typeof Brain; label: string; color: string; bg: string }> = {
  frequent: {
    icon: Repeat,
    label: "Frequent",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  new_pattern: {
    icon: Brain,
    label: "New pattern",
    color: "text-finpay-warning",
    bg: "bg-finpay-warning/10",
  },
  trending: {
    icon: TrendingUp,
    label: "Trending",
    color: "text-finpay-success",
    bg: "bg-finpay-success/10",
  },
  unusual: {
    icon: AlertCircle,
    label: "Unusual",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
};

const ContextBadge = ({ type, className = "" }: ContextBadgeProps) => {
  const { icon: Icon, label, color, bg } = config[type];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-semibold ${bg} ${color} ${className}`}
    >
      <Icon size={9} />
      {label}
    </motion.span>
  );
};

export default ContextBadge;
