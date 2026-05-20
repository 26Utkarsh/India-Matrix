import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../navigation/Sidebar';
import { Topbar } from '../navigation/Topbar';
import { TimelineSlider } from '../timeline/TimelineSlider';
import { PoliticalModal } from '../modals/PoliticalModal';
import { EventsModal } from '../modals/EventsModal';
import { CompareModal } from '../modals/CompareModal';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      <Sidebar />
      <Topbar />
      
      {/* Main content area */}
      <main 
        className="lg:pl-[240px] pt-[60px] pb-[120px] min-h-screen"
      >
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>

      <TimelineSlider />
      
      <PoliticalModal />
      <EventsModal />
      <CompareModal />
    </div>
  );
};
