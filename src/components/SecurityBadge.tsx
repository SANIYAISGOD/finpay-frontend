import { Shield, Lock, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface SecurityBadgeProps {
  messages?: string[];
}

const SecurityBadge = ({ messages = [
  "End-to-end encrypted transaction",
  "No raw biometric data stored",
  "Biometric token stored securely"
] }: SecurityBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="finpay-card p-4 space-y-2.5"
    >
      <div className="flex items-center gap-2 text-finpay-success">
        <Shield size={16} />
        <span className="text-xs font-semibold uppercase tracking-wide">Security Layer Active</span>
      </div>
      {messages.map((msg, i) => (
        <div key={i} className="flex items-center gap-2 text-muted-foreground">
          {i === 0 ? <Lock size={13} /> : <Eye size={13} />}
          <span className="text-xs">{msg}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default SecurityBadge;
