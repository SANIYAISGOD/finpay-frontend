import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";
import FinPayLogo from "@/components/FinPayLogo";
import SecurityBadge from "@/components/SecurityBadge";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = "500", merchant = "QuickMart Store", timestamp = new Date().toLocaleString(), userId = "••••1234" } = location.state || {};

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex justify-center">
          <FinPayLogo size="sm" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="finpay-card p-8 text-center space-y-5"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-full finpay-gradient mx-auto flex items-center justify-center finpay-glow"
          >
            <CheckCircle2 size={52} className="text-primary-foreground" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-finpay-success font-semibold">Payment Successful</p>
            <p className="text-4xl font-extrabold text-foreground mt-2">₹{parseFloat(amount).toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 pt-4 border-t border-border"
          >
            {[
              { label: "Merchant", value: merchant },
              { label: "Date & Time", value: timestamp },
              { label: "User ID", value: `User ${userId}` },
              { label: "Transaction ID", value: `TXN${Date.now().toString().slice(-8)}` },
              { label: "Status", value: "Completed", highlight: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className={`font-medium ${item.highlight ? "text-finpay-success" : "text-foreground"}`}>{item.value}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3"
        >
          <Button variant="outline" className="flex-1 h-11 rounded-xl gap-2">
            <Download size={16} /> Receipt
          </Button>
          <Button variant="outline" className="flex-1 h-11 rounded-xl gap-2">
            <Share2 size={16} /> Share
          </Button>
        </motion.div>

        <SecurityBadge messages={[
          "Biometric authentication successful",
          "End-to-end encrypted transaction",
          "No raw biometric data stored",
        ]} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full h-12 finpay-gradient text-primary-foreground font-semibold text-base rounded-xl"
          >
            Back to Dashboard <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default Confirmation;
