import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingOverlayProps {
  className?: string;
  label?: string;
}

const LoadingOverlay = ({ className, label = "Loading" }: LoadingOverlayProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={cn(
      "fixed inset-0 z-[9999] flex items-center justify-center",
      "bg-gradient-to-br from-[#ff2d55] via-[#3b1c66] to-[#0066ff]", // red → purple → blue classy gradient
      "backdrop-blur-xl",
      className
    )}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center gap-6"
    >
      {/* Glowing Spinner */}
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 animate-spin rounded-full border-[4px] border-white/30 border-t-white/90 shadow-[0_0_25px_rgba(255,255,255,0.6)]" />
        <div className="absolute inset-3 animate-spin-slow rounded-full border-[3px] border-white/20 border-t-transparent" />
      </div>

      {/* Elegant Label */}
      <p className="text-sm font-semibold tracking-[0.35em] text-white/90 uppercase drop-shadow-md">
        {label}
      </p>
    </motion.div>
  </motion.div>
);

export default LoadingOverlay;
