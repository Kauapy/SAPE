import React from 'react';
import { X, BookOpen, Clock, BarChart3, Plus, FolderOpen } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'notes' | 'timer' | 'stats';
  onViewChange: (view: 'notes' | 'timer' | 'stats') => void;
}

export function Sidebar({ isOpen, onClose, activeView, onViewChange }: SidebarProps) {
  const { categories, selectedCategory, setSelectedCategory } = useNotes();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]`}
      >
        <div className="p-6 border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">EduStudy</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <div className="md:hidden space-y-2 mb-6 pb-6 border-b border-gray-200">
            <button
              onClick={() => {
                onViewChange('notes');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'notes'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Anotações
            </button>
            <button
              onClick={() => {
                onViewChange('timer');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'timer'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-5 h-5" />
              Timer de Estudo
            </button>
            <button
              onClick={() => {
                onViewChange('stats');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'stats'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Estatísticas
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                Categorias
              </h3>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <Plus className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === null
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FolderOpen className="w-5 h-5" />
                Todas as Notas
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}