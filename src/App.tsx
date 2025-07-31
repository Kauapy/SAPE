import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { NotesArea } from './components/NotesArea';
import { StudyTimer } from './components/StudyTimer';
import { Statistics } from './components/Statistics';
import { NotesProvider } from './contexts/NotesContext';

function App() {
  const [activeView, setActiveView] = useState<'notes' | 'timer' | 'stats'>('notes');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NotesProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          activeView={activeView}
          onViewChange={setActiveView}
        />
        
        <div className="flex">
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeView={activeView}
            onViewChange={setActiveView}
          />
          
          <main className="flex-1 transition-all duration-300 ease-in-out lg:ml-64">
            <div className="p-4 lg:p-8">
              {activeView === 'notes' && <NotesArea />}
              {activeView === 'timer' && <StudyTimer />}
              {activeView === 'stats' && <Statistics />}
            </div>
          </main>
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;