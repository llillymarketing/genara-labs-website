"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Only show once per browser session
    const seen = sessionStorage.getItem("genara-preloader");
    if (seen) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem("genara-preloader", "1");
    const t = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "#0D2137" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {/* Logo — fade + lift in */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src="/genara-logo-transparent.png"
              alt="Genara Labs"
              width={400}
              height={100}
              className="brightness-0 invert w-[200px] sm:w-[260px] md:w-[300px]"
              priority
            />

            {/* Light sweep shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none -skew-x-[18deg]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
              }}
              initial={{ x: "-160%" }}
              animate={{ x: "260%" }}
              transition={{ duration: 0.65, delay: 0.55, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Thin progress bar along the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, #4FC3F7, #1565C0, #4FC3F7)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
