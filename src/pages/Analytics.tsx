import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Clock, Users, Lightbulb, BarChart3 } from "lucide-react";
import AppShell from "@/components/AppShell";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Tooltip } from "recharts";

const weeklyData = [
  { day: "Mon", earned: 1200, spent: 800 },
  { day: "Tue", earned: 1800, spent: 600 },
  { day: "Wed", earned: 900, spent: 1200 },
  { day: "Thu", earned: 2200, spent: 400 },
  { day: "Fri", earned: 3100, spent: 900 },
  { day: "Sat", earned: 4500, spent: 1500 },
  { day: "Sun", earned: 4200, spent: 700 },
];

const categoryData = [
  { name: "Food & Dining", value: 3200, color: "hsl(214, 84%, 56%)" },
  { name: "Transport", value: 1800, color: "hsl(230, 84%, 62%)" },
  { name: "Shopping", value: 2400, color: "hsl(152, 69%, 45%)" },
  { name: "Bills", value: 1600, color: "hsl(38, 92%, 50%)" },
];

const hourlyData = [
  { hour: "6AM", txns: 2 }, { hour: "9AM", txns: 5 }, { hour: "12PM", txns: 8 },
  { hour: "3PM", txns: 6 }, { hour: "6PM", txns: 12 }, { hour: "9PM", txns: 15 },
  { hour: "12AM", txns: 3 },
];

const topCustomers = [
  { name: "Priya Sharma", txns: 12, amount: 15600 },
  { name: "Ravi Kumar", txns: 8, amount: 9200 },
  { name: "Anita Desai", txns: 6, amount: 7400 },
];

const aiInsights = [
  { icon: TrendingUp, text: "You earn 2.3x more on weekends", highlight: "weekends" },
  { icon: Clock, text: "Peak earning hours: 6–9 PM", highlight: "6–9 PM" },
  { icon: Users, text: "Priya is your top customer this week", highlight: "Priya" },
  { icon: Lightbulb, text: "Your spending dropped 15% this month", highlight: "15%" },
];

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Smart Analytics</h1>
            <p className="text-xs text-muted-foreground">AI-powered insights</p>
          </div>
          <div className="ml-auto w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <BarChart3 size={20} className="text-primary" />
          </div>
        </div>

        {/* AI Insights */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Lightbulb size={14} className="text-finpay-warning" /> AI Insights
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {aiInsights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="finpay-card p-3 space-y-1.5"
              >
                <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                  <insight.icon size={14} className="text-primary" />
                </div>
                <p className="text-[11px] text-foreground leading-snug">{insight.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Earnings Chart */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="finpay-card p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Weekly Earnings vs Spending</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={2}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(215, 16%, 47%)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(214,20%,92%)", borderRadius: "12px", fontSize: "11px" }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
                />
                <Bar dataKey="earned" fill="hsl(214, 84%, 56%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" fill="hsl(214, 100%, 90%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Earned</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/30" /> Spent</span>
          </div>
        </motion.div>

        {/* Peak Hours */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="finpay-card p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Peak Transaction Hours</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" />
                <XAxis dataKey="hour" tick={{ fontSize: 9, fill: "hsl(215, 16%, 47%)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(214,20%,92%)", borderRadius: "12px", fontSize: "11px" }}
                />
                <Line type="monotone" dataKey="txns" stroke="hsl(214, 84%, 56%)" strokeWidth={2} dot={{ fill: "hsl(214, 84%, 56%)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="finpay-card p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Spending by Category</h3>
          <div className="flex items-center gap-4">
            <div className="w-28 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={28} outerRadius={50} paddingAngle={3} dataKey="value">
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-[11px] text-foreground">{cat.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-foreground">₹{cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Customers */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="finpay-card p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Users size={14} className="text-primary" /> Top Customers This Week
          </h3>
          <div className="space-y-2.5">
            {topCustomers.map((customer, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full finpay-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{customer.name}</p>
                    <p className="text-[10px] text-muted-foreground">{customer.txns} transactions</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-finpay-success">₹{customer.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default Analytics;
