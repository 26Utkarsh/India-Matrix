import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from '../navigation/Sidebar';
import { Topbar } from '../navigation/Topbar';
import { TimelineSlider } from '../timeline/TimelineSlider';
import { PoliticalModal } from '../modals/PoliticalModal';
import { EventsModal } from '../modals/EventsModal';
import { CompareModal } from '../modals/CompareModal';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 indian-art-mandala">
      <Sidebar />
      <Topbar />
      
      {/* Main content area */}
      <main 
        className="lg:pl-[240px] pt-16 pb-[120px] min-h-screen"
      >
        <div className="p-4 lg:p-6 overflow-hidden">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

      <TimelineSlider />
      
      <PoliticalModal />
      <EventsModal />
      <CompareModal />
    </div>
  );
};
