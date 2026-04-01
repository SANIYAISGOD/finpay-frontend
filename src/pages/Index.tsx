import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Shield, Zap, Fingerprint, PhoneOff, Wallet, Store,
  Banknote, QrCode, Receipt, IndianRupee, CreditCard, Building2,
  Smartphone, Users, Sparkles, ChevronRight, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";
import FinPayLogo from "@/components/FinPayLogo";

const banks = [
  { name: "SBI", color: "bg-blue-600" },
  { name: "HDFC", color: "bg-red-600" },
  { name: "ICICI", color: "bg-orange-500" },
  { name: "Axis", color: "bg-purple-700" },
  { name: "PNB", color: "bg-yellow-600" },
  { name: "BOB", color: "bg-orange-600" },
];

const quickServices = [
  { icon: QrCode, label: "Scan & Pay", color: "bg-primary/10 text-primary" },
  { icon: Banknote, label: "Bank Transfer", color: "bg-finpay-success/10 text-finpay-success" },
  { icon: Receipt, label: "Bill Pay", color: "bg-finpay-warning/10 text-finpay-warning" },
  { icon: CreditCard, label: "Cards", color: "bg-destructive/10 text-destructive" },
];

const offers = [
  { title: "₹50 Cashback", desc: "On first biometric payment", tag: "NEW USER" },
  { title: "UPI Rewards", desc: "Earn ₹10 on every 5th scan", tag: "TRENDING" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="space-y-6 py-4">
        {/* Top Bar — Paytm style */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <FinPayLogo size="md" />
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-1">
              <IndianRupee size={12} className="text-primary" />
              <span className="text-xs font-bold text-primary">UPI</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Banner — Gradient card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="finpay-gradient rounded-3xl p-6 text-primary-foreground relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-8 -translate-x-8" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles size={10} /> India's First Biometric UPI
            </div>
            <h1 className="text-2xl font-extrabold leading-tight">
              Phone Nahi?<br />Finger Hai Na! 👆
            </h1>
            <p className="text-xs opacity-80 leading-relaxed max-w-[240px]">
              Bhool gaye phone ghar pe? No tension! Bas fingerprint lagao aur payment ho jayega.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Button
                onClick={() => navigate("/onboarding")}
                className="bg-white text-primary font-bold text-sm h-10 px-5 rounded-xl hover:bg-white/90"
              >
                Shuru Karo <ArrowRight size={16} className="ml-1" />
              </Button>
              <div className="flex items-center gap-1 text-[10px] opacity-70">
                <Star size={10} fill="currentColor" />
                <span>4.8 rating · 10L+ users</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-3"
        >
          {quickServices.map((s, i) => (
            <motion.button
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              onClick={() => navigate("/onboarding")}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.color} transition-transform group-hover:scale-105`}>
                <s.icon size={24} />
              </div>
              <span className="text-[10px] font-semibold text-foreground leading-tight text-center">{s.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Supported Banks */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="finpay-card p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-muted-foreground" />
              <span className="text-xs font-bold text-foreground">Supported Banks</span>
            </div>
            <span className="text-[10px] text-primary font-semibold">150+ Banks</span>
          </div>
          <div className="flex items-center gap-2">
            {banks.map((bank) => (
              <div
                key={bank.name}
                className={`${bank.color} w-10 h-10 rounded-xl flex items-center justify-center`}
              >
                <span className="text-[9px] font-extrabold text-white">{bank.name}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Works with SBI, HDFC, ICICI, Axis, PNB, Kotak, BOB & more via UPI
          </p>
        </motion.div>

        {/* How It Works — Paytm style horizontal scroll cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
          <p className="text-sm font-bold text-foreground">Kaise Kaam Karta Hai?</p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
            {[
              { step: "1", title: "Aadhaar Link Karo", desc: "Apna Aadhaar ya phone number link karo aur fingerprint register karo", icon: Fingerprint, gradient: "from-primary to-blue-600" },
              { step: "2", title: "Kisi Bhi Dukaan Pe Jao", desc: "Phone, card ya wallet ki zarurat nahi — bas tum chalo", icon: Store, gradient: "from-purple-500 to-primary" },
              { step: "3", title: "Finger Lagao, Payment Ho Gaya!", desc: "Merchant terminal pe finger rakho — instant payment!", icon: Wallet, gradient: "from-primary to-emerald-500" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="finpay-card p-4 min-w-[200px] flex-shrink-0 space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                  <span className="text-xs font-extrabold text-white">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
                </div>
                <item.icon size={20} className="text-muted-foreground/30" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Offers Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <p className="text-sm font-bold text-foreground">🎁 Offers & Rewards</p>
          <div className="space-y-2">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="finpay-card p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-finpay-warning/10 flex items-center justify-center">
                    <span className="text-lg">🎉</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-foreground">{offer.title}</p>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase">{offer.tag}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{offer.desc}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="finpay-card p-4"
        >
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { value: "10L+", label: "Users", icon: Users },
              { value: "256-bit", label: "Encryption", icon: Shield },
              { value: "RBI", label: "Compliant", icon: Building2 },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1.5">
                <stat.icon size={16} className="text-primary mx-auto" />
                <p className="text-sm font-extrabold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Powered by UPI + Aadhaar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex justify-center items-center gap-4 py-2"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted">
            <IndianRupee size={12} className="text-muted-foreground" />
            <span className="text-[10px] font-bold text-muted-foreground">UPI Powered</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted">
            <Fingerprint size={12} className="text-muted-foreground" />
            <span className="text-[10px] font-bold text-muted-foreground">Aadhaar Enabled</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted">
            <Shield size={12} className="text-muted-foreground" />
            <span className="text-[10px] font-bold text-muted-foreground">NPCI</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3 pb-4"
        >
          <Button
            onClick={() => navigate("/onboarding")}
            className="w-full h-14 finpay-gradient text-primary-foreground font-bold text-base rounded-2xl finpay-glow"
          >
            Register with Aadhaar <ArrowRight size={20} className="ml-2" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="w-full text-muted-foreground text-sm"
          >
            Already registered? Go to Dashboard
          </Button>
          <p className="text-[9px] text-center text-muted-foreground">
            By continuing, you agree to FinPay's Terms of Service & Privacy Policy.<br />
            Regulated by RBI · NPCI Authorized · UIDAI Compliant
          </p>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default Index;
