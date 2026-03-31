import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";
import FinPayLogo from "@/components/FinPayLogo";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Fingerprint, title: "Biometric Payments", desc: "Pay with your fingerprint instantly" },
    { icon: Shield, title: "Privacy-First", desc: "No raw biometric data ever stored" },
    { icon: Zap, title: "Instant & Secure", desc: "Sub-second tokenized authentication" },
  ];

  return (
    <AppShell>
      <div className="space-y-10 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-5"
        >
          <div className="flex justify-center">
            <FinPayLogo size="lg" />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold text-foreground leading-tight">
              The Future of<br />
              <span className="finpay-gradient-text">Biometric Payments</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Register once. Authenticate with your fingerprint. Pay anywhere, instantly.
            </p>
          </div>
        </motion.div>

        {/* Fingerprint visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full finpay-gradient opacity-10 animate-fingerprint-pulse" />
            <div className="absolute inset-2 rounded-full finpay-gradient opacity-5 animate-fingerprint-pulse" style={{ animationDelay: "0.7s" }} />
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 flex items-center justify-center">
              <Fingerprint size={52} className="text-primary" />
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="finpay-card p-4 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl finpay-gradient flex items-center justify-center shrink-0">
                <f.icon size={20} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate("/onboarding")}
            className="w-full h-14 finpay-gradient text-primary-foreground font-bold text-base rounded-2xl finpay-glow"
          >
            Get Started <ArrowRight size={20} className="ml-2" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="w-full text-muted-foreground text-sm"
          >
            Already registered? Go to Dashboard
          </Button>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default Index;
