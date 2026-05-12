import React from 'react';
import { Menu, BookOpen, Clock, BarChart3, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  activeView: 'notes' | 'timer' | 'stats';
  onViewChange: (view: 'notes' | 'timer' | 'stats') => void;
}

export function Header({ onMenuClick, activeView, onViewChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Sape</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onViewChange('notes')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'notes'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Anotações
            </button>

            <button
              onClick={() => onViewChange('timer')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'timer'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Timer
            </button>

            <button
              onClick={() => onViewChange('stats')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'stats'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Estatísticas
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar anotações..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}