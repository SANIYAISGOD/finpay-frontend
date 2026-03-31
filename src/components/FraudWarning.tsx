import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldAlert, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FraudWarningProps {
  amount: string;
  merchant: string;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

type RiskLevel = "low" | "medium" | "high";

interface RiskAnalysis {
  level: RiskLevel;
  reasons: string[];
  score: number;
}

function analyzeRisk(amount: string, merchant: string): RiskAnalysis {
  const amt = parseFloat(amount) || 0;
  const reasons: string[] = [];
  let score = 0;

  if (amt > 10000) {
    reasons.push("Unusually high transaction amount");
    score += 40;
  } else if (amt > 5000) {
    reasons.push("Above average transaction amount");
    score += 20;
  }

  const knownMerchants = ["QuickMart Store", "Cafe Mocha", "Amazon Pay"];
  if (!knownMerchants.includes(merchant)) {
    reasons.push("New or unknown merchant");
    score += 30;
  }

  const hour = new Date().getHours();
  if (hour < 6 || hour > 23) {
    reasons.push("Unusual transaction time");
    score += 20;
  }

  if (reasons.length === 0) {
    reasons.push("Transaction appears normal");
  }

  const level: RiskLevel = score >= 50 ? "high" : score >= 20 ? "medium" : "low";
  return { level, reasons, score };
}

const FraudWarning = ({ amount, merchant, onConfirm, onCancel, visible }: FraudWarningProps) => {
  const risk = analyzeRisk(amount, merchant);

  if (risk.level === "low") {
    // Auto-proceed for low risk
    return null;
  }

  const colors = {
    medium: {
      bg: "bg-finpay-warning/10",
      border: "border-finpay-warning/30",
      icon: "text-finpay-warning",
      badge: "bg-finpay-warning/20 text-finpay-warning",
    },
    high: {
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      icon: "text-destructive",
      badge: "bg-destructive/20 text-destructive",
    },
  };

  const style = colors[risk.level];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`finpay-card p-5 space-y-4 ${style.border} border-2`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center flex-shrink-0`}>
              <ShieldAlert size={20} className={style.icon} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-bold text-foreground">AI Security Alert</h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${style.badge}`}>
                  {risk.level} risk
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Our AI has flagged this transaction for review
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {risk.reasons.map((reason, i) => (
              <div key={i} className="flex items-center gap-2">
                <AlertTriangle size={12} className={style.icon} />
                <span className="text-xs text-foreground">{reason}</span>
              </div>
            ))}
          </div>

          <div className={`rounded-xl p-3 ${style.bg}`}>
            <p className="text-xs text-muted-foreground">
              AI Confidence Score: <span className="font-bold text-foreground">{risk.score}%</span> risk detected
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 h-10 rounded-xl text-sm"
            >
              <X size={14} className="mr-1" /> Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-10 finpay-gradient text-primary-foreground rounded-xl text-sm"
            >
              <CheckCircle size={14} className="mr-1" /> Confirm Anyway
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FraudWarning;
