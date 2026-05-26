import { motion } from "framer-motion";
import { Package, CheckCircle, Eye } from "lucide-react";

interface StatsGridProps {
  stats: {
    total: number;
    expired: number;
    warning: number;
  };
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  const items = [
    { label: "Total de Itens", value: stats.total, color: "text-foreground", icon: Package },
    { label: "Vencendo Logo", value: stats.warning, color: "text-status-yellow", icon: CheckCircle },
    { label: "Já Vencidos", value: stats.expired, color: "text-status-red", icon: Eye }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.1 }} 
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {items.map((stat, i) => (
        <div key={i} className="glass rounded-2xl p-5 flex items-center gap-4 transition-transform hover:scale-[1.02]">
          <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
             <stat.icon className="h-6 w-6" />
          </div>
          <div>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">{stat.label}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
