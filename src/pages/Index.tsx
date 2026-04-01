import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Zap, Fingerprint, Wallet, Store,
  IndianRupee, Building2, Sparkles, ChevronRight,
  Lock, Smartphone, Globe, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FinPayLogo from "@/components/FinPayLogo";

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

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="relative z-10 max-w-md mx-auto px-4">
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between py-5"
        >
          <FinPayLogo size="md" />
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            <IndianRupee size={11} className="text-primary" />
            <span className="text-[10px] font-bold text-primary tracking-wider">UPI ENABLED</span>
          </div>
        </motion.nav>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="pt-4 pb-6 space-y-5"
        >
          <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-tight text-foreground">
            Phone Nahi?
            <br />
            <span className="finpay-gradient-text">Finger Hai Na!</span>
            <span className="text-3xl ml-1">👆</span>
          </h1>

          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[320px]">
            India's first <span className="text-primary font-semibold">Aadhaar-linked biometric UPI</span> payment system.
            Bhool gaye phone ghar pe? No worries!
          </p>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/onboarding")}
              className="h-12 px-6 finpay-gradient text-primary-foreground font-bold text-sm rounded-xl finpay-glow border-0"
            >
              Shuru Karo <ArrowRight size={16} className="ml-1.5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="h-12 px-5 font-medium text-sm rounded-xl"
            >
              Dashboard →
            </Button>
          </div>
        </motion.section>

        {/* Supported Banks Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 space-y-3"
        >
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">Supported Banks</span>
          </div>

          <div className="relative">
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {banks.map((bank, i) => (
                <motion.div
                  key={bank.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.04 }}
                  className="flex-shrink-0 px-4 py-3 rounded-xl finpay-card hover:border-primary/30 hover:shadow-md transition-all cursor-default"
                >
                  <p className="text-xs font-bold text-foreground whitespace-nowrap">{bank.name}</p>
                  <p className="text-[8px] text-muted-foreground whitespace-nowrap">{bank.full}</p>
                </motion.div>
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </motion.section>

        

        {/* India Scene Image */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="relative rounded-3xl overflow-hidden mb-8 shadow-lg border border-border/50"
        >
          <img
            src="/har-gali.png"
            alt="Biometric payments at Indian shops"
            className="w-full h-48 object-cover"
            loading="lazy"
            width={800}
            height={512}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            <p className="text-sm font-bold text-white">Har Gali, Har Dukaan</p>
            <p className="text-[10px] text-white/80">From street vendors to malls — pay with just your finger</p>
          </div>
        </motion.section>
{/* How it Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-lg font-extrabold text-foreground">
            Kaise Kaam Karta Hai? <span className="text-primary">✦</span>
          </h2>

          <div className="space-y-3">
            {[
              { step: "01", title: "Aadhaar Link Karo", desc: "Apna Aadhaar ya phone link karo aur fingerprint register karo — bas ek baar", icon: Fingerprint },
              { step: "02", title: "Kisi Bhi Dukaan Pe Jao", desc: "Phone, card, wallet kuch nahi chahiye — sirf tum chalo", icon: Store },
              { step: "03", title: "Finger Lagao, Done!", desc: "Merchant ke terminal pe finger rakho — instant UPI payment!", icon: Wallet },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl finpay-card hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl finpay-gradient flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-xs font-extrabold text-primary-foreground">{item.step}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                </div>
                <item.icon size={18} className="text-muted-foreground/30 shrink-0 mt-1" />
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Why FinPay */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-lg font-extrabold text-foreground">
            Why FinPay? <span className="text-primary">✦</span>
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: Lock, title: "Bank-Grade Security", desc: "256-bit encryption, no raw biometric data stored" },
              { icon: Zap, title: "Instant Auth", desc: "Sub-second fingerprint authentication" },
              { icon: Globe, title: "Works Offline Too", desc: "Fingerprint auth even without internet" },
              { icon: Award, title: "RBI Compliant", desc: "Designed for NPCI & UIDAI compliance" },
              { icon: IndianRupee, title: "Zero MDR", desc: "No transaction charges on UPI payments" },
              { icon: Smartphone, title: "Phone Optional", desc: "That's the whole point — no phone needed" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75 + i * 0.06 }}
                className="p-4 rounded-2xl finpay-card space-y-2.5 hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon size={18} className="text-primary" />
                </div>
                <p className="text-xs font-bold text-foreground leading-tight">{f.title}</p>
                <p className="text-[10px] text-muted-foreground leading-snug">{f.desc}</p>
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
          <h2 className="text-lg font-extrabold text-foreground">🎁 Launch Offers</h2>
          {[
            { title: "Early Access Cashback", desc: "Pehli biometric payment pe cashback milega", tag: "EARLY BIRD", emoji: "🎉" },
            { title: "Refer & Earn", desc: "Dost ko bulao, dono ko rewards", tag: "INVITE", emoji: "🤝" },
          ].map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.08 }}
              className="flex items-center gap-3 p-4 rounded-2xl finpay-card hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-2xl">{offer.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-foreground">{offer.title}</p>
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wider">{offer.tag}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{offer.desc}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground/40" />
            </motion.div>
          ))}
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="pb-10 space-y-4"
        >
          <div className="p-6 rounded-3xl bg-accent border border-primary/10 text-center space-y-4">
            <Sparkles size={24} className="text-primary mx-auto" />
            <h3 className="text-xl font-extrabold text-foreground">Aaj Hi Shuru Karo</h3>
            <p className="text-xs text-muted-foreground max-w-[260px] mx-auto">
              Aadhaar link karo, fingerprint register karo,<br />aur bina phone ke payment karo — abhi!
            </p>
            <Button
              onClick={() => navigate("/onboarding")}
              className="w-full h-14 finpay-gradient text-primary-foreground font-bold text-base rounded-2xl finpay-glow border-0"
            >
              Register with Aadhaar <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="w-full text-muted-foreground text-sm"
          >
            Already registered? Go to Dashboard
          </Button>

          <p className="text-[9px] text-center text-muted-foreground leading-relaxed">
            By continuing, you agree to FinPay's Terms of Service & Privacy Policy.
            <br />Designed for RBI · NPCI · UIDAI compliance · Made in India 🇮🇳
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
