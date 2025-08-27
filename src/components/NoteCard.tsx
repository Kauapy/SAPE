import React from 'react';
import { Calendar, Tag, Edit3, Trash2, BookOpen } from 'lucide-react';
import { Note } from '../types/Note';
import { useNotes } from '../contexts/NotesContext';

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
}

export function NoteCard({ note, onEdit }: NoteCardProps) {
  const { deleteNote } = useNotes();

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta anotação?')) {
      deleteNote(note.id);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
  <div
    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group"
    // Fundo branco, cantos arredondados, sombra padrão que aumenta ao passar o mouse,
    // transição suave, espaçamento interno, borda leve e agrupamento para hover em elementos filhos
  >
    <div className="flex items-start justify-between mb-4">
      {/* Layout flexível com alinhamento no topo e espaçamento entre os elementos */}
      <div className="flex items-center gap-2">
        {/* Alinha ícone e título lado a lado com espaçamento entre eles */}
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          {/* Ícone com fundo gradiente azul-roxo, tamanho fixo, centralizado e com cantos arredondados */}
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-1">
            {/* Título em negrito, cor escura, limitado a uma linha com reticências */}
            {note.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {/* Ícone de calendário e data com espaçamento e margem superior */}
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              {/* Texto pequeno e cinza para a data */}
              {formatDate(note.updatedAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Botões de edição e exclusão visíveis apenas ao passar o mouse no card */}
        <button
          onClick={onEdit}
          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
          // Botão com padding, fundo azul claro ao hover, cantos arredondados e transição de cor
        >
          <Edit3 className="w-4 h-4 text-blue-600" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          // Botão com fundo vermelho claro ao hover, estilo similar ao botão de edição
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>

    <div className="mb-4">
      {/* Espaçamento inferior para separar do rodapé */}
      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
        {/* Texto cinza, pequeno, limitado a 3 linhas com espaçamento entre linhas */}
        {note.content.replace(/<[^>]*>/g, '')}
      </p>
    </div>

    <div className="flex items-center justify-between">
      {/* Rodapé com categoria à esquerda e botão "Abrir" à direita */}
      <div className="flex items-center gap-2">
        <Tag className="w-3 h-3 text-gray-400" />
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {/* Categoria com estilo de tag: texto pequeno, fundo cinza claro, padding e bordas arredondadas */}
          {note.category}
        </span>
      </div>

      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        // Botão "Abrir" com texto azul, escurece ao hover, fonte média e transição suave
      >
        Abrir
      </button>
    </div>
  </div>
);
}