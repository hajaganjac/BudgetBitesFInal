import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function CookToast() {
  const { toast, dismissToast } = useApp();
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 3500);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            className="bg-[color:var(--color-text-primary)] text-white rounded-[12px] px-4 py-3 flex items-center gap-3 bb-shadow-elevated max-w-[360px]"
          >
            <CheckCircle2 size={18} className="text-[color:var(--color-accent-cool)]" />
            <span className="text-[13px]">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
