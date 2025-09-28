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
    <div className="max-w-7xl mx-auto"> // largura máxima e centralização horizontal
  <div className="mb-8"> // margem inferior
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"> // layout flexível com espaçamento e alinhamento responsivo
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2"> // título grande, negrito, cor escura, margem inferior
          Suas Anotações
        </h1>
        <p className="text-gray-600"> // texto com cor cinza suave
          Organize seus estudos e mantenha suas notas sempre à mão
        </p>
      </div>
      
      <button
        onClick={() => setIsEditorOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
        // botão com gradiente azul-roxo, texto branco, padding, bordas arredondadas, sombra e transição suave
      >
        <Plus className="w-5 h-5" /> // ícone com tamanho fixo
        Nova Anotação
      </button>
    </div>

    <div className="mt-6 flex flex-col sm:flex-row gap-4"> // margem superior, layout flexível com espaçamento
      <div className="relative flex-1"> // posicionamento relativo e ocupa espaço restante
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> // ícone posicionado dentro do input
        <input
          type="text"
          placeholder="Buscar anotações..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          // campo de busca com padding para ícone, borda cinza, foco azul, transição de cor
        />
      </div>
      
      <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
        {/* botão de filtro com borda, arredondamento, hover suave e ícone alinhado */}
        <Filter className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700">Filtros</span>
      </button>
    </div>
  </div>

  {filteredNotes.length === 0 ? (
    <div className="text-center py-12"> // centralização e espaçamento vertical
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {/* círculo com ícone centralizado */}
        <BookOpen className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2"> // título médio, negrito, cor escura
        {notes.length === 0 ? 'Nenhuma anotação ainda' : 'Nenhuma anotação encontrada'}
      </h3>
      <p className="text-gray-600 mb-6"> // texto cinza com espaçamento inferior
        {notes.length === 0 
          ? 'Comece criando sua primeira anotação de estudo' 
          : 'Tente ajustar os filtros ou termos de busca'
        }
      </p>
      {notes.length === 0 && (
        <button
          onClick={() => setIsEditorOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          // botão azul com texto branco, arredondado, hover e transição
        >
          Criar Primeira Anotação
        </button>
      )}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* layout em grade com 1, 2 ou 3 colunas dependendo do tamanho da tela */}
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