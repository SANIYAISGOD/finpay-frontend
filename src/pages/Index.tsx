import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Fingerprint, PhoneOff, Wallet, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";
import FinPayLogo from "@/components/FinPayLogo";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: PhoneOff, title: "No Phone Needed", desc: "Left your phone at home? Just use your fingerprint to pay" },
    { icon: Fingerprint, title: "Biometric Identity", desc: "Your fingerprint is your wallet — register once, pay forever" },
    { icon: Shield, title: "Privacy-First", desc: "No raw biometric data ever stored — fully tokenized" },
    { icon: Zap, title: "Instant & Secure", desc: "Sub-second authentication at any merchant terminal" },
  ];

  const howItWorks = [
    { step: "01", title: "Register Once", desc: "Link your phone or Aadhaar and scan your fingerprint", icon: Fingerprint },
    { step: "02", title: "Walk Into Any Store", desc: "No phone, no card, no wallet needed", icon: Store },
    { step: "03", title: "Scan & Pay", desc: "Place your finger on the merchant terminal — done!", icon: Wallet },
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
              Pay Without<br />
              <span className="finpay-gradient-text">Your Phone</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
              Forgot your phone? Lost your wallet? No problem.<br />
              Your fingerprint is all you need.
            </p>
          </div>
        </motion.div>

        {/* Hero visual — phone crossed out + fingerprint */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative flex items-center gap-6">
            {/* Phone off */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.35, x: 0 }}
              transition={{ delay: 0.3 }}
              className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center"
            >
              <SmartphoneOff size={32} className="text-muted-foreground" />
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ArrowRight size={24} className="text-muted-foreground/50" />
            </motion.div>

            {/* Fingerprint */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full finpay-gradient opacity-10 animate-fingerprint-pulse" />
              <div className="absolute inset-2 rounded-full finpay-gradient opacity-5 animate-fingerprint-pulse" style={{ animationDelay: "0.7s" }} />
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 flex items-center justify-center">
                <Fingerprint size={44} className="text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tagline badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Fingerprint size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary">Your finger = Your wallet</span>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="space-y-3"
        >
          <p className="text-sm font-bold text-foreground text-center">How It Works</p>
          <div className="space-y-2.5">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="finpay-card p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl finpay-gradient flex items-center justify-center shrink-0">
                  <span className="text-xs font-extrabold text-primary-foreground">{item.step}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <item.icon size={18} className="text-muted-foreground/40 shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <p className="text-sm font-bold text-foreground text-center">Why FinPay?</p>
          <div className="grid grid-cols-2 gap-2.5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75 + i * 0.08 }}
                className="finpay-card p-4 text-center space-y-2"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <f.icon size={18} className="text-primary" />
                </div>
                <p className="text-xs font-semibold text-foreground leading-tight">{f.title}</p>
                <p className="text-[10px] text-muted-foreground leading-snug">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
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
