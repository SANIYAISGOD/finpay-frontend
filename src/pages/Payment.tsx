import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Nfc, Phone, QrCode, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/AppShell";
import FingerprintScanner from "@/components/FingerprintScanner";
import SecurityBadge from "@/components/SecurityBadge";
import FraudWarning from "@/components/FraudWarning";

type PayStep = "amount" | "identity" | "fraud_check" | "auth" | "processing";
type IdentityMethod = "nfc" | "phone" | "qr";

const Payment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<PayStep>("amount");
  const [amount, setAmount] = useState("");
  const [identityMethod, setIdentityMethod] = useState<IdentityMethod>("nfc");
  const [phoneInput, setPhoneInput] = useState("");

  const slideVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  const handleProceedToAuth = () => {
    // Show fraud check step before auth
    setStep("fraud_check");
  };

  const handleFraudConfirm = () => {
    setStep("auth");
  };

  const handleFraudCancel = () => {
    setStep("amount");
  };

  const handleAuthComplete = (success: boolean) => {
    if (success) {
      setTimeout(() => {
        navigate("/confirmation", {
          state: {
            amount,
            merchant: "QuickMart Store",
            timestamp: new Date().toLocaleString(),
            userId: `••••${phoneInput.slice(-4) || "1234"}`,
          },
        });
      }, 1000);
    }
  };

  const identityMethods = [
    { key: "nfc" as const, icon: Nfc, label: "NFC Tap", desc: "Tap device to identify", preferred: true },
    { key: "phone" as const, icon: Phone, label: "Phone Number", desc: "Enter registered number" },
    { key: "qr" as const, icon: QrCode, label: "QR Code", desc: "Scan user QR" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => step === "amount" ? navigate("/dashboard") : setStep("amount")} className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Merchant Payment</h1>
            <p className="text-xs text-muted-foreground">QuickMart Store</p>
          </div>
          <div className="ml-auto w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Store size={20} className="text-primary" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "amount" && (
            <motion.div key="amount" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
              <div className="finpay-card p-8 text-center space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Enter Amount</p>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-extrabold text-foreground mr-1">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={amount}
                    onChange={e => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                    placeholder="0"
                    className="text-5xl font-extrabold text-foreground bg-transparent outline-none w-48 text-center"
                  />
                </div>
              </div>
              <Button
                onClick={() => setStep("identity")}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full h-12 finpay-gradient text-primary-foreground font-semibold text-base rounded-xl"
              >
                Authenticate Payment
              </Button>
            </motion.div>
          )}

          {step === "identity" && (
            <motion.div key="identity" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
              <div className="finpay-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-foreground">Paying</p>
                  <p className="text-2xl font-extrabold finpay-gradient-text">₹{parseFloat(amount).toLocaleString()}</p>
                </div>
              </div>

              <p className="text-sm font-semibold text-foreground">Select Identity Method</p>
              <div className="space-y-2.5">
                {identityMethods.map(m => (
                  <button
                    key={m.key}
                    onClick={() => setIdentityMethod(m.key)}
                    className={`w-full finpay-card p-4 flex items-center gap-3 transition-all cursor-pointer ${
                      identityMethod === m.key ? "border-primary/50 bg-accent" : "hover:border-border"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      identityMethod === m.key ? "finpay-gradient" : "bg-muted"
                    }`}>
                      <m.icon size={18} className={identityMethod === m.key ? "text-primary-foreground" : "text-muted-foreground"} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">
                        {m.label}
                        {m.preferred && <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold">Preferred</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      identityMethod === m.key ? "border-primary" : "border-border"
                    }`}>
                      {identityMethod === m.key && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                  </button>
                ))}
              </div>

              {identityMethod === "phone" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="finpay-card p-4">
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Registered Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+91</span>
                    <Input
                      value={phoneInput}
                      onChange={e => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                      placeholder="9876543210"
                      className="pl-12 h-11"
                      maxLength={10}
                    />
                  </div>
                </motion.div>
              )}

              <Button
                onClick={handleProceedToAuth}
                disabled={identityMethod === "phone" && phoneInput.length < 10}
                className="w-full h-12 finpay-gradient text-primary-foreground font-semibold text-base rounded-xl"
              >
                Proceed to Fingerprint Auth
              </Button>
            </motion.div>
          )}

          {step === "fraud_check" && (
            <motion.div key="fraud_check" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
              <div className="finpay-card p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-xl font-extrabold finpay-gradient-text">₹{parseFloat(amount).toLocaleString()}</span>
              </div>

              <FraudWarning
                amount={amount}
                merchant="QuickMart Store"
                onConfirm={handleFraudConfirm}
                onCancel={handleFraudCancel}
                visible={true}
              />

              {/* If low risk, auto-proceed */}
              {parseFloat(amount) <= 5000 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="finpay-card p-4 text-center space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-finpay-success/10 flex items-center justify-center mx-auto">
                    <span className="text-finpay-success text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">AI Check Passed</p>
                    <p className="text-xs text-muted-foreground">No suspicious activity detected</p>
                  </div>
                  <Button
                    onClick={handleFraudConfirm}
                    className="w-full h-12 finpay-gradient text-primary-foreground font-semibold rounded-xl"
                  >
                    Continue to Authentication
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === "auth" && (
            <motion.div key="auth" variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
              <div className="finpay-card p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-xl font-extrabold finpay-gradient-text">₹{parseFloat(amount).toLocaleString()}</span>
              </div>

              <div className="finpay-card p-8">
                <FingerprintScanner
                  label="Scan fingerprint to pay"
                  onComplete={handleAuthComplete}
                />
              </div>

              <SecurityBadge />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
};

export default Payment;
