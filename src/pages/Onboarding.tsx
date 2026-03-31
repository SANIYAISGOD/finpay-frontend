import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Phone, CreditCard, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppShell from "@/components/AppShell";
import FinPayLogo from "@/components/FinPayLogo";
import FingerprintScanner from "@/components/FingerprintScanner";
import SecurityBadge from "@/components/SecurityBadge";

type Step = "method" | "input" | "otp" | "fingerprint" | "success";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<"phone" | "aadhaar">("phone");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const isOtpFilled = otp.every(d => d !== "");

  const slideVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FinPayLogo size="lg" />
          </div>
          {step === "method" && (
            <p className="text-muted-foreground text-sm">Register once. Pay with your fingerprint, forever.</p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {step === "method" && (
            <motion.div key="method" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-4">
              <p className="text-sm font-semibold text-foreground text-center">Choose verification method</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "phone" as const, icon: Phone, label: "Phone Number", desc: "OTP via SMS" },
                  { key: "aadhaar" as const, icon: CreditCard, label: "Aadhaar", desc: "Consent-based" },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => { setMethod(opt.key); setStep("input"); }}
                    className={`finpay-card p-5 text-center hover:border-primary/40 transition-all group cursor-pointer`}
                  >
                    <div className="w-10 h-10 rounded-xl finpay-gradient mx-auto mb-3 flex items-center justify-center group-hover:finpay-glow transition-shadow">
                      <opt.icon size={20} className="text-primary-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "input" && (
            <motion.div key="input" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
              <div className="finpay-card p-6 space-y-4">
                <label className="text-sm font-medium text-foreground">
                  {method === "phone" ? "Enter your phone number" : "Enter your Aadhaar number"}
                </label>
                <div className="relative">
                  {method === "phone" && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">+91</span>
                  )}
                  <Input
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value.replace(/\D/g, ""))}
                    placeholder={method === "phone" ? "9876543210" : "1234 5678 9012"}
                    className={method === "phone" ? "pl-12 h-12 text-lg" : "h-12 text-lg tracking-widest"}
                    maxLength={method === "phone" ? 10 : 12}
                  />
                </div>
                {method === "aadhaar" && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-accent">
                    <Shield size={16} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">Consent-based verification. Your identity is securely tokenized. No sensitive data is stored or shared.</p>
                  </div>
                )}
              </div>
              <Button
                onClick={() => setStep("otp")}
                disabled={identifier.length < (method === "phone" ? 10 : 12)}
                className="w-full h-12 finpay-gradient text-primary-foreground font-semibold text-base rounded-xl"
              >
                Send OTP <ArrowRight size={18} className="ml-2" />
              </Button>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div key="otp" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
              <div className="finpay-card p-6 space-y-5">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Verify OTP</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sent to {method === "phone" ? `+91 ${identifier.slice(0, 4)}••••${identifier.slice(-2)}` : `••••${identifier.slice(-4)}`}
                  </p>
                </div>
                <div className="flex justify-center gap-2.5">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(e.target.value, i)}
                      className="w-11 h-13 text-center text-xl font-bold rounded-xl border-2 border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-muted-foreground">Demo: Enter any 6 digits</p>
              </div>
              <Button
                onClick={() => setStep("fingerprint")}
                disabled={!isOtpFilled}
                className="w-full h-12 finpay-gradient text-primary-foreground font-semibold text-base rounded-xl"
              >
                Verify & Continue
              </Button>
            </motion.div>
          )}

          {step === "fingerprint" && (
            <motion.div key="fingerprint" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
              <div className="finpay-card p-8 text-center space-y-6">
                <div>
                  <p className="text-base font-semibold text-foreground">Register Your Fingerprint</p>
                  <p className="text-xs text-muted-foreground mt-1">This biometric will be used for future payments</p>
                </div>
                <FingerprintScanner
                  label="Tap to register fingerprint"
                  onComplete={(success) => {
                    if (success) setTimeout(() => setStep("success"), 800);
                  }}
                />
              </div>
              <SecurityBadge messages={[
                "Biometric token stored securely",
                "Identity mapped to user ID",
                "No sensitive data is stored or shared",
              ]} />
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
              <div className="finpay-card p-8 text-center space-y-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-finpay-success-light mx-auto flex items-center justify-center"
                >
                  <CheckCircle2 size={44} className="text-finpay-success" />
                </motion.div>
                <div>
                  <p className="text-xl font-bold text-foreground">You're all set!</p>
                  <p className="text-sm text-muted-foreground mt-1">Your biometric identity is registered and tokenized.</p>
                </div>
                <div className="p-3 rounded-xl bg-accent text-xs text-muted-foreground space-y-1">
                  <p>✓ Your identity is securely tokenized</p>
                  <p>✓ No sensitive data is stored or shared</p>
                  <p>✓ Pay instantly with your fingerprint</p>
                </div>
              </div>
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full h-12 finpay-gradient text-primary-foreground font-semibold text-base rounded-xl"
              >
                Go to Dashboard <ArrowRight size={18} className="ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
};

export default Onboarding;
