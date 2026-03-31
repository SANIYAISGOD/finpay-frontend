import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CreditCard, Send, QrCode, History, ArrowUpRight, ArrowDownLeft, Bell } from "lucide-react";
import AppShell from "@/components/AppShell";
import FinPayLogo from "@/components/FinPayLogo";
import { Button } from "@/components/ui/button";

const recentTxns = [
  { id: 1, name: "Cafe Mocha", amount: -180, time: "2 min ago", type: "debit" },
  { id: 2, name: "Received from Priya", amount: 2500, time: "1 hr ago", type: "credit" },
  { id: 3, name: "Amazon Pay", amount: -1299, time: "Yesterday", type: "debit" },
  { id: 4, name: "Salary Credit", amount: 45000, time: "2 days ago", type: "credit" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: Send, label: "Pay", color: "finpay-gradient", onClick: () => navigate("/payment") },
    { icon: QrCode, label: "Scan", color: "finpay-gradient", onClick: () => navigate("/payment") },
    { icon: CreditCard, label: "Cards", color: "finpay-gradient", onClick: () => {} },
    { icon: History, label: "History", color: "finpay-gradient", onClick: () => {} },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <FinPayLogo size="sm" />
          <button className="w-9 h-9 rounded-full bg-accent flex items-center justify-center relative">
            <Bell size={18} className="text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="finpay-gradient rounded-2xl p-6 text-primary-foreground finpay-glow"
        >
          <p className="text-sm opacity-80 font-medium">Available Balance</p>
          <p className="text-3xl font-extrabold mt-1">₹ 24,850.00</p>
          <div className="flex items-center gap-4 mt-4 text-sm opacity-90">
            <span className="flex items-center gap-1"><ArrowUpRight size={14} /> ₹12,400 spent</span>
            <span className="flex items-center gap-1"><ArrowDownLeft size={14} /> ₹47,500 received</span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-3"
        >
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl finpay-gradient flex items-center justify-center group-hover:finpay-glow transition-shadow">
                <action.icon size={22} className="text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Merchant Pay CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Button
            onClick={() => navigate("/payment")}
            className="w-full h-14 finpay-gradient text-primary-foreground font-semibold text-base rounded-2xl finpay-glow"
          >
            <CreditCard size={20} className="mr-2" /> Merchant Payment
          </Button>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
            <button className="text-xs text-primary font-medium">View All</button>
          </div>
          <div className="finpay-card divide-y divide-border/50">
            {recentTxns.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    txn.type === "credit" ? "bg-finpay-success-light" : "bg-accent"
                  }`}>
                    {txn.type === "credit" ? (
                      <ArrowDownLeft size={16} className="text-finpay-success" />
                    ) : (
                      <ArrowUpRight size={16} className="text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{txn.name}</p>
                    <p className="text-xs text-muted-foreground">{txn.time}</p>
                  </div>
                </div>
                <p className={`text-sm font-bold ${txn.type === "credit" ? "text-finpay-success" : "text-foreground"}`}>
                  {txn.type === "credit" ? "+" : "-"}₹{Math.abs(txn.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
