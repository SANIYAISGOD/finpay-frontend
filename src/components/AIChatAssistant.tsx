import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  actions?: { label: string; route?: string }[];
}

const mockTransactions = [
  { name: "Cafe Mocha", amount: -180, time: "2 min ago", type: "debit" },
  { name: "Priya", amount: 2500, time: "1 hr ago", type: "credit" },
  { name: "Amazon Pay", amount: -1299, time: "Yesterday", type: "debit" },
  { name: "Salary Credit", amount: 45000, time: "2 days ago", type: "credit" },
  { name: "Grocery Store", amount: -850, time: "3 days ago", type: "debit" },
  { name: "Ravi", amount: 500, time: "4 days ago", type: "credit" },
];

function generateResponse(input: string): Message {
  const lower = input.toLowerCase();

  if (lower.includes("priya")) {
    const tx = mockTransactions.find(t => t.name === "Priya");
    return {
      id: Date.now(),
      role: "assistant",
      content: tx
        ? `Yes! You received ₹${Math.abs(tx.amount).toLocaleString()} from Priya, ${tx.time}.`
        : "I couldn't find any recent transactions with Priya.",
      actions: [{ label: "Send to Priya", route: "/payment" }],
    };
  }

  if (lower.includes("earn") && lower.includes("today")) {
    const earned = mockTransactions
      .filter(t => t.type === "credit" && t.time.includes("ago"))
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      id: Date.now(),
      role: "assistant",
      content: `You've earned ₹${earned.toLocaleString()} in recent transactions. Your peak earning hours are typically 6–9 PM.`,
    };
  }

  if (lower.includes("last") && lower.includes("transaction")) {
    const last3 = mockTransactions.slice(0, 3);
    const lines = last3.map(t =>
      `• ${t.name}: ${t.type === "credit" ? "+" : "-"}₹${Math.abs(t.amount).toLocaleString()} (${t.time})`
    ).join("\n");
    return {
      id: Date.now(),
      role: "assistant",
      content: `Here are your last 3 transactions:\n${lines}`,
      actions: [{ label: "View All History" }],
    };
  }

  if (lower.includes("spend") || lower.includes("spent")) {
    const spent = mockTransactions
      .filter(t => t.type === "debit")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return {
      id: Date.now(),
      role: "assistant",
      content: `You've spent ₹${spent.toLocaleString()} recently. Your biggest expense was Amazon Pay at ₹1,299.`,
    };
  }

  if (lower.includes("balance")) {
    return {
      id: Date.now(),
      role: "assistant",
      content: "Your current balance is ₹24,850.00. You're in good standing! 💙",
    };
  }

  return {
    id: Date.now(),
    role: "assistant",
    content: "I can help you with:\n• Transaction history\n• Earnings & spending\n• Balance inquiries\n• Payment details\n\nTry asking \"How much did I earn today?\" or \"Show my last transactions\".",
  };
}

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hi! I'm FinPay AI 🤖\nAsk me about your transactions, earnings, or spending.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, response]);
    }, 600);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full finpay-gradient finpay-glow flex items-center justify-center z-50 shadow-lg"
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      >
        <MessageCircle size={22} className="text-primary-foreground" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-96 finpay-card overflow-hidden flex flex-col shadow-2xl"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="finpay-gradient p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-primary-foreground" />
                <div>
                  <p className="text-sm font-bold text-primary-foreground">FinPay AI</p>
                  <p className="text-[10px] text-primary-foreground/70">Smart Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X size={18} className="text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[200px] max-h-[50vh]">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] ${
                    msg.role === "user"
                      ? "finpay-gradient text-primary-foreground rounded-2xl rounded-br-md"
                      : "bg-accent text-foreground rounded-2xl rounded-bl-md"
                  } px-3 py-2`}>
                    <p className="text-xs whitespace-pre-line">{msg.content}</p>
                    {msg.actions && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.actions.map((action, i) => (
                          <button
                            key={i}
                            className="text-[10px] px-2 py-1 rounded-lg bg-primary/20 text-primary font-semibold flex items-center gap-1"
                          >
                            {action.label} <ArrowRight size={10} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Ask about your transactions..."
                  className="h-9 text-xs rounded-xl"
                />
                <button
                  onClick={handleSend}
                  className="w-9 h-9 rounded-xl finpay-gradient flex items-center justify-center flex-shrink-0"
                >
                  <Send size={14} className="text-primary-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatAssistant;
