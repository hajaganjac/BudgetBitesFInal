import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './Sidebar';
import { CookToast } from './features/Toast';
import { useLogout } from '../context/LogoutContext';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const onLogout = useLogout();
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-bg-app)' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-[color:var(--color-border-subtle)]">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-[color:var(--color-bg-muted)]"><Menu size={20} /></button>
          <div className="text-[15px] font-semibold">BudgetBites</div>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1120px] px-5 lg:px-10 pt-6 lg:pt-8 pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <CookToast />
    </div>
  );
}
