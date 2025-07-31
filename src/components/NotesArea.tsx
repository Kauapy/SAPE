import React, { useState } from 'react';
import { Plus, Search, Filter, BookOpen } from 'lucide-react';
import { NoteCard } from './NoteCard';
import { NoteEditor } from './NoteEditor';
import { useNotes } from '../contexts/NotesContext';

export function NotesArea() {
  const { notes, filteredNotes, searchTerm, setSearchTerm } = useNotes();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const handleEditNote = (noteId: string) => {
    setEditingNote(noteId);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Suas Anotações
            </h1>
            <p className="text-gray-600">
              Organize seus estudos e mantenha suas notas sempre à mão
            </p>
          </div>
          
          <button
            onClick={() => setIsEditorOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nova Anotação
          </button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar anotações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">Filtros</span>
          </button>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {notes.length === 0 ? 'Nenhuma anotação ainda' : 'Nenhuma anotação encontrada'}
          </h3>
          <p className="text-gray-600 mb-6">
            {notes.length === 0 
              ? 'Comece criando sua primeira anotação de estudo' 
              : 'Tente ajustar os filtros ou termos de busca'
            }
          </p>
          {notes.length === 0 && (
            <button
              onClick={() => setIsEditorOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Criar Primeira Anotação
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => handleEditNote(note.id)}
            />
          ))}
        </div>
      )}

      {isEditorOpen && (
        <NoteEditor
          noteId={editingNote}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
}