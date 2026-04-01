import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight, Zap, Fingerprint, Wallet, Store,
  IndianRupee, Building2, Sparkles, ChevronRight,
  Star, Users, Lock, Smartphone, Globe, TrendingUp, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FinPayLogo from "@/components/FinPayLogo";
import heroImage from "@/assets/hero-fingerprint.jpg";
import sceneImage from "@/assets/india-fintech-scene.jpg";
import trustImage from "@/assets/trust-badges.jpg";

const banks = [
  { name: "SBI", full: "State Bank of India" },
  { name: "HDFC", full: "HDFC Bank" },
  { name: "ICICI", full: "ICICI Bank" },
  { name: "Axis", full: "Axis Bank" },
  { name: "PNB", full: "Punjab National Bank" },
  { name: "Kotak", full: "Kotak Mahindra" },
  { name: "BOB", full: "Bank of Baroda" },
  { name: "Union", full: "Union Bank" },
  { name: "Canara", full: "Canara Bank" },
  { name: "IDBI", full: "IDBI Bank" },
];

const stats = [
  { value: "10L+", label: "Active Users", icon: Users },
  { value: "₹500Cr+", label: "Transactions", icon: TrendingUp },
  { value: "0.3s", label: "Avg. Auth Time", icon: Zap },
  { value: "150+", label: "Bank Partners", icon: Building2 },
];

const Index = () => {
  const navigate = useNavigate();
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050A18] text-white overflow-x-hidden">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4">
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between py-5"
        >
          <FinPayLogo size="md" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5">
              <IndianRupee size={11} className="text-cyan-400" />
              <span className="text-[10px] font-bold text-cyan-400 tracking-wider">UPI ENABLED</span>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="pt-4 pb-8 space-y-6"
        >
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-400 tracking-wide">LIVE IN 200+ CITIES ACROSS INDIA</span>
          </motion.div>

          <h1 className="text-[42px] font-extrabold leading-[1.05] tracking-tight">
            Phone Nahi?
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Finger Hai Na!
            </span>
            <span className="text-3xl ml-1">👆</span>
          </h1>

          <p className="text-[15px] text-white/50 leading-relaxed max-w-[320px]">
            India's first <span className="text-cyan-400 font-semibold">Aadhaar-linked biometric UPI</span> payment system. 
            Bhool gaye phone ghar pe? Koi baat nahi — bas fingerprint lagao, payment ho jayega.
          </p>

          {/* Animated stat ticker */}
          <div className="h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-2"
              >
                {(() => {
                  const StatIcon = stats[currentStat].icon;
                  return <StatIcon size={14} className="text-cyan-400" />;
                })()}
                <span className="text-sm font-bold text-cyan-400">{stats[currentStat].value}</span>
                <span className="text-xs text-white/40">{stats[currentStat].label}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/onboarding")}
              className="h-12 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)] border-0"
            >
              Shuru Karo <ArrowRight size={16} className="ml-1.5" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="h-12 px-5 text-white/50 hover:text-white hover:bg-white/5 font-medium text-sm rounded-xl"
            >
              Dashboard →
            </Button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#facc15" className="text-yellow-400" />
              ))}
            </div>
            <span className="text-[11px] text-white/40">4.8 rating · 10L+ downloads on Play Store</span>
          </div>
        </motion.section>

        {/* Hero Image */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-8"
        >
          <img 
            src={heroImage} 
            alt="FinPay Biometric Payment Technology" 
            className="w-full h-56 object-cover"
            width={800}
            height={512}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A18] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs text-white/60 font-medium">Aadhaar-Linked Biometric Authentication</p>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-4 gap-2 mb-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.05 }}
              className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
            >
              <stat.icon size={16} className="text-cyan-400 mx-auto mb-1.5" />
              <p className="text-sm font-extrabold text-white">{stat.value}</p>
              <p className="text-[9px] text-white/40 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Banks Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-cyan-400" />
              <span className="text-xs font-bold text-white/80">Supported Banks</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-semibold">150+ Banks →</span>
          </div>
          
          {/* Scrolling bank carousel */}
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {banks.map((bank, i) => (
                <motion.div
                  key={bank.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.04 }}
                  className="flex-shrink-0 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all cursor-default"
                >
                  <p className="text-xs font-bold text-white/90 whitespace-nowrap">{bank.name}</p>
                  <p className="text-[8px] text-white/30 whitespace-nowrap">{bank.full}</p>
                </motion.div>
              ))}
            </div>
            {/* Fade edges */}
            <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-[#050A18] to-transparent pointer-events-none" />
          </div>
        </motion.section>

        {/* How it Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-lg font-extrabold text-white">
            Kaise Kaam Karta Hai? <span className="text-cyan-400">✦</span>
          </h2>
          
          <div className="space-y-3">
            {[
              { step: "01", title: "Aadhaar Link Karo", desc: "Apna Aadhaar number ya phone link karo aur fingerprint register karo — bas ek baar", icon: Fingerprint, accent: "from-cyan-500 to-cyan-600" },
              { step: "02", title: "Kisi Bhi Dukaan Pe Jao", desc: "Phone, card, wallet kuch nahi chahiye — sirf tum chalo", icon: Store, accent: "from-blue-500 to-blue-600" },
              { step: "03", title: "Finger Lagao, Done!", desc: "Merchant ke terminal pe finger rakho — instant UPI payment ho jayega!", icon: Wallet, accent: "from-purple-500 to-purple-600" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 transition-colors"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center shrink-0 shadow-lg`}>
                  <span className="text-xs font-extrabold text-white">{item.step}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-[11px] text-white/40 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
                <item.icon size={18} className="text-white/10 shrink-0 mt-1" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* India Scene Image */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative rounded-3xl overflow-hidden mb-8"
        >
          <img 
            src={sceneImage} 
            alt="FinPay being used across India" 
            className="w-full h-48 object-cover"
            loading="lazy"
            width={800}
            height={512}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A18] via-[#050A18]/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            <p className="text-sm font-bold text-white">Har Gali, Har Dukaan</p>
            <p className="text-[10px] text-white/50">From street vendors to malls — FinPay works everywhere</p>
          </div>
        </motion.section>

        {/* Why FinPay — Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-lg font-extrabold text-white">
            Why FinPay? <span className="text-cyan-400">✦</span>
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: Lock, title: "Bank-Grade Security", desc: "256-bit encryption, no biometric data stored", accent: "text-cyan-400" },
              { icon: Zap, title: "0.3s Authentication", desc: "Faster than scanning a QR code", accent: "text-yellow-400" },
              { icon: Globe, title: "Works Offline Too", desc: "Fingerprint auth works even without internet", accent: "text-emerald-400" },
              { icon: Award, title: "RBI Compliant", desc: "Fully regulated & NPCI authorized", accent: "text-purple-400" },
              { icon: IndianRupee, title: "Zero MDR", desc: "No transaction charges for UPI payments", accent: "text-blue-400" },
              { icon: Smartphone, title: "Phone Optional", desc: "That's the whole point — no phone needed", accent: "text-rose-400" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.06 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5 hover:border-white/[0.12] transition-colors"
              >
                <f.icon size={20} className={f.accent} />
                <p className="text-xs font-bold text-white leading-tight">{f.title}</p>
                <p className="text-[10px] text-white/35 leading-snug">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Offers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mb-8 space-y-3"
        >
          <h2 className="text-lg font-extrabold text-white">
            🎁 Offers & Cashback
          </h2>
          {[
            { title: "₹50 Cashback", desc: "Pehli biometric payment pe turant cashback", tag: "NEW USER", emoji: "🎉" },
            { title: "₹10 Har 5th Payment", desc: "Regular use karo, rewards paao", tag: "REWARDS", emoji: "⭐" },
            { title: "Refer & Earn ₹100", desc: "Dost ko bulao, dono ko milega", tag: "INVITE", emoji: "🤝" },
          ].map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.08 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 transition-colors cursor-pointer"
            >
              <span className="text-2xl">{offer.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{offer.title}</p>
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 uppercase tracking-wider">{offer.tag}</span>
                </div>
                <p className="text-[10px] text-white/40 mt-0.5">{offer.desc}</p>
              </div>
              <ChevronRight size={14} className="text-white/20" />
            </motion.div>
          ))}
        </motion.section>

        {/* Trust Section with Image */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="mb-8 rounded-3xl overflow-hidden border border-white/[0.06]"
        >
          <img 
            src={trustImage} 
            alt="Regulated by UPI, RBI and Aadhaar" 
            className="w-full h-28 object-cover"
            loading="lazy"
            width={1024}
            height={512}
          />
          <div className="p-4 bg-white/[0.02] text-center space-y-2">
            <p className="text-xs font-bold text-white/80">Trusted by India's Financial Infrastructure</p>
            <div className="flex justify-center gap-4">
              {["UPI Powered", "RBI Regulated", "NPCI Authorized", "Aadhaar Enabled"].map((badge) => (
                <span key={badge} className="text-[9px] text-white/30 font-medium">{badge}</span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="pb-10 space-y-4"
        >
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10 border border-cyan-500/20 text-center space-y-4">
            <Sparkles size={24} className="text-cyan-400 mx-auto" />
            <h3 className="text-xl font-extrabold text-white">
              Aaj Hi Shuru Karo
            </h3>
            <p className="text-xs text-white/40 max-w-[260px] mx-auto">
              Aadhaar link karo, fingerprint register karo,<br />aur bina phone ke payment karo — abhi!
            </p>
            <Button
              onClick={() => navigate("/onboarding")}
              className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base rounded-2xl shadow-[0_0_40px_-8px_rgba(6,182,212,0.5)] border-0"
            >
              Register with Aadhaar <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="w-full text-white/30 hover:text-white/60 text-sm"
          >
            Already registered? Go to Dashboard
          </Button>

          <p className="text-[9px] text-center text-white/20 leading-relaxed">
            By continuing, you agree to FinPay's Terms of Service & Privacy Policy.
            <br />Regulated by RBI · NPCI Authorized · UIDAI Compliant · Made in India 🇮🇳
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
