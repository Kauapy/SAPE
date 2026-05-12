import React from 'react';
import { BarChart3, Clock, BookOpen, Target, TrendingUp, Calendar } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';

export function Statistics() {
  const { notes, categories } = useNotes();

  const getNotesPerCategory = () => {
    const categoryCount: { [key: string]: number } = {};
    notes.forEach(note => {
      categoryCount[note.category] = (categoryCount[note.category] || 0) + 1;
    });
    return categoryCount;
  };

  const getRecentActivity = () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return notes.filter(note => note.createdAt >= lastWeek).length;
  };

  const categoryStats = getNotesPerCategory();
  const recentNotes = getRecentActivity();
  const totalWords = notes.reduce((total, note) => {
    return total + note.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Estatísticas de Estudo
        </h1>
        <p className="text-gray-600">
          Acompanhe seu progresso e produtividade nos estudos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{notes.length}</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Total de Anotações</h3>
          <p className="text-sm text-gray-600">Todas as suas notas de estudo</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{categories.length}</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Categorias</h3>
          <p className="text-sm text-gray-600">Diferentes áreas de estudo</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{recentNotes}</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Esta Semana</h3>
          <p className="text-sm text-gray-600">Novas anotações criadas</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{totalWords.toLocaleString()}</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Total de Palavras</h3>
          <p className="text-sm text-gray-600">Em todas as anotações</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Anotações por Categoria
          </h2>

          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, count]) => {
              const percentage = (count / notes.length) * 100;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{category}</span>
                    <span className="text-sm text-gray-600">{count} notas</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {notes.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">
                Crie algumas anotações para ver as estatísticas
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Progresso de Estudos
          </h2>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {notes.length > 0 ? Math.round(totalWords / notes.length) : 0}
              </div>
              <p className="text-sm text-gray-600">Palavras por anotação (média)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600 mb-1">
                  {notes.filter(note => {
                    const today = new Date();
                    const noteDate = new Date(note.createdAt);
                    return noteDate.toDateString() === today.toDateString();
                  }).length}
                </div>
                <p className="text-xs text-blue-600">Hoje</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600 mb-1">
                  {recentNotes}
                </div>
                <p className="text-xs text-green-600">Esta semana</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Dicas para melhorar</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tente criar pelo menos 1 nota por dia</li>
                <li>• Organize suas notas em categorias</li>
                <li>• Revise suas anotações regularmente</li>
                <li>• Use o timer para sessões focadas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Atividade Recente
        </h2>

        {notes.length > 0 ? (
          <div className="space-y-3">
            {notes
              .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
              .slice(0, 5)
              .map((note) => (
                <div key={note.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{note.title}</p>
                    <p className="text-sm text-gray-600">
                      {note.category} • {new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(note.updatedAt)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">
              Sua atividade de estudo aparecerá aqui
            </p>
          </div>
        )}
      </div>
    </div>
  );
}