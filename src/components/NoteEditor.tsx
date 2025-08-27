import React, { useState, useEffect } from 'react';
import { X, Save, Tag, Type, List, Hash } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';

interface NoteEditorProps {
  noteId?: string | null;
  onClose: () => void;
}

export function NoteEditor({ noteId, onClose }: NoteEditorProps) {
  const { notes, addNote, updateNote, categories } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Geral');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  const isEditing = !!noteId;
  const note = isEditing ? notes.find(n => n.id === noteId) : null;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const finalCategory = showNewCategory && newCategory.trim() 
      ? newCategory.trim() 
      : category;

    if (isEditing && noteId) {
      updateNote(noteId, {
        title: title.trim(),
        content: content.trim(),
        category: finalCategory,
      });
    } else {
      addNote({
        title: title.trim(),
        content: content.trim(),
        category: finalCategory,
      });
    }

    onClose();
  };

  const insertFormat = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = '';
    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'list':
        newText = selectedText.split('\n').map(line => line.trim() ? `• ${line}` : line).join('\n');
        break;
      case 'numbered':
        newText = selectedText.split('\n').map((line, index) => 
          line.trim() ? `${index + 1}. ${line}` : line
        ).join('\n');
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
  {/* Modal fixo cobrindo toda a tela (inset-0), fundo preto semi-transparente,
      com z-index alto para sobrepor tudo, centralizado com flexbox e padding */}
  <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
    {/* Caixa branca com cantos arredondados, sombra profunda, largura total com limite máximo,
        altura máxima de 90% da tela, layout em coluna */}
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      {/* Cabeçalho com layout flexível, alinhamento central e espaçamento entre título e botão,
          padding interno e borda inferior cinza clara */}
      <h2 className="text-xl font-semibold text-gray-900">
        {/* Título com fonte grande, negrito e cor escura */}
        {isEditing ? 'Editar Anotação' : 'Nova Anotação'}
      </h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {/* Botão de fechar com padding, fundo cinza claro ao hover, cantos arredondados e transição suave */}
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>

    <div className="flex-1 p-6 overflow-auto">
      {/* Área principal com preenchimento, rolagem automática se exceder altura */}
      <div className="space-y-6">
        {/* Espaçamento vertical entre os blocos de formulário */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {/* Rótulo do campo título com fonte pequena, negrito e cor cinza escura */}
            Título da Anotação
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da sua anotação..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
            // Campo de texto com largura total, padding interno, borda cinza clara,
            // cantos arredondados, efeito de foco azul, transição suave e fonte grande
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <div className="flex gap-2">
            {/* Layout flexível com espaçamento entre o select e o botão */}
            <select
              value={showNewCategory ? '' : category}
              onChange={(e) => {
                setCategory(e.target.value);
                setShowNewCategory(false);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={showNewCategory}
              // Select com preenchimento, borda cinza clara, cantos arredondados,
              // efeito de foco azul e transição suave
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowNewCategory(!showNewCategory)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              // Botão para alternar nova categoria com borda, padding, hover cinza claro e transição
            >
              <Tag className="w-4 h-4" />
            </button>
          </div>

          {showNewCategory && (
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nome da nova categoria..."
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              // Campo para nova categoria com margem superior, preenchimento,
              // borda cinza clara, cantos arredondados e efeito de foco azul
            />
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            {/* Cabeçalho do campo conteúdo com label e botões de formatação */}
            <label className="block text-sm font-medium text-gray-700">
              Conteúdo
            </label>
            <div className="flex gap-1">
              {/* Botões de formatação com espaçamento entre eles */}
              <button
                onClick={() => insertFormat('bold')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Negrito"
              >
                <Type className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => insertFormat('list')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Lista"
              >
                <List className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => insertFormat('numbered')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Lista numerada"
              >
                <Hash className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva suas anotações aqui..."
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none font-mono text-sm leading-relaxed"
            // Área de texto com largura total, padding, borda cinza clara,
            // cantos arredondados, efeito de foco azul, sem redimensionamento,
            // fonte monoespaçada, texto pequeno e espaçamento entre linhas
          />
        </div>
      </div>
    </div>

    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
      {/* Rodapé com botões alinhados à direita, espaçamento entre eles,
          padding interno e borda superior cinza clara */}
      <button
        onClick={onClose}
        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        // Botão de cancelar com padding, texto cinza escuro, fundo cinza claro ao hover,
        // cantos arredondados e transição suave
      >
        Cancelar
      </button>
      <button
        onClick={handleSave}
        disabled={!title.trim() || !content.trim()}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        // Botão de salvar com fundo gradiente azul-roxo, texto branco, padding,
        // cantos arredondados, fonte média, hover escurecido, transição suave,
        // sombra profunda, estilo desabilitado com opacidade e cursor bloqueado,
        // layout flexível com ícone e texto lado a lado
      >
        <Save className="w-4 h-4" />
        {isEditing ? 'Salvar Alterações' : 'Criar Anotação'}
      </button>
    </div>
  </div>  
</div>

  );
}