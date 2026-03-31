import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Check, X } from "lucide-react";
import { useState, useEffect } from "react";

type ScanState = "idle" | "scanning" | "success" | "failure";

interface FingerprintScannerProps {
  onComplete?: (success: boolean) => void;
  autoStart?: boolean;
  label?: string;
}

const FingerprintScanner = ({ onComplete, autoStart = false, label = "Tap to authenticate" }: FingerprintScannerProps) => {
  const [state, setState] = useState<ScanState>("idle");

  useEffect(() => {
    if (autoStart) handleScan();
  }, [autoStart]);

  const handleScan = () => {
    if (state === "scanning") return;
    setState("scanning");

    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      setState(success ? "success" : "failure");
      onComplete?.(success);

      setTimeout(() => setState("idle"), 2500);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onClick={handleScan}
        className="relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer"
        whileTap={{ scale: 0.95 }}
        aria-label="Scan fingerprint"
      >
        {/* Outer pulse rings */}
        {state === "scanning" && (
          <>
            <span className="absolute inset-0 rounded-full animate-fingerprint-pulse finpay-gradient opacity-20" />
            <span className="absolute inset-[-8px] rounded-full animate-fingerprint-pulse finpay-gradient opacity-10" style={{ animationDelay: "0.5s" }} />
          </>
        )}

        {/* Main circle */}
        <motion.div
          className={`relative w-28 h-28 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
            state === "success"
              ? "border-finpay-success bg-finpay-success-light"
              : state === "failure"
              ? "border-destructive bg-destructive/10"
              : state === "scanning"
              ? "border-primary bg-accent"
              : "border-primary/30 bg-accent"
          }`}
          animate={state === "scanning" ? { scale: [1, 1.03, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-finpay-success">
                <Check size={40} strokeWidth={3} />
              </motion.div>
            ) : state === "failure" ? (
              <motion.div key="x" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-destructive">
                <X size={40} strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div key="fp" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Fingerprint size={44} className={state === "scanning" ? "text-primary animate-pulse" : "text-primary/60"} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scan line */}
          {state === "scanning" && (
            <div className="absolute inset-x-4 top-4 bottom-4 overflow-hidden rounded-full">
              <div className="absolute left-0 right-0 h-0.5 bg-primary/60 animate-scan-line" />
            </div>
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.p
          key={state}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={`text-sm font-medium ${
            state === "success" ? "text-finpay-success" : state === "failure" ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {state === "idle" && label}
          {state === "scanning" && "Authenticating…"}
          {state === "success" && "Biometric verified ✓"}
          {state === "failure" && "Authentication failed. Try again."}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default FingerprintScanner;
