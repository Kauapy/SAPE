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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" // fundo escuro semi-transparente, cobre toda a tela, visível apenas em telas pequenas
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]`} // barra lateral fixa, largura 64, fundo branco, sombra, transição suave, comportamento responsivo em telas grandes
      >
        <div className="p-6 border-b border-gray-200 lg:hidden"> // padding interno, borda inferior, visível apenas em telas pequenas
          <div className="flex items-center justify-between"> // layout flexível com alinhamento e espaçamento
            <div className="flex items-center gap-2"> // ícone e título com espaçamento horizontal
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"> // ícone com fundo gradiente, bordas arredondadas e centralizado
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Sape</h2> // título com tamanho grande, negrito e cor escura
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors" // botão com padding, hover cinza claro, bordas arredondadas e transição suave
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2"> // navegação com padding e espaçamento vertical entre os itens
          <div className="md:hidden space-y-2 mb-6 pb-6 border-b border-gray-200"> // visível apenas em telas pequenas, com espaçamento e borda inferior
            <button
              onClick={() => {
                onViewChange('notes');
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'notes'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`} // botão com preenchimento, bordas arredondadas, estilo ativo azul ou cinza com hover
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
              }`} // botão para timer com estilo ativo ou hover
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
              }`} // botão para estatísticas com estilo ativo ou hover
            >
              <BarChart3 className="w-5 h-5" />
              Estatísticas
            </button>
          </div>

          <div className="space-y-4"> // espaçamento vertical entre blocos
            <div className="flex items-center justify-between"> // título e botão de adicionar categoria
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide"> // título pequeno, negrito, cor escura, letras maiúsculas e espaçamento entre letras
                Categorias
              </h3>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors"> // botão pequeno com hover e bordas arredondadas
                <Plus className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-2"> // espaçamento entre botões de categoria
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === null
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`} // botão "Todas as Notas" com estilo ativo ou hover
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
                  }`} // botão de categoria com estilo ativo ou hover
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div> // indicador de cor com gradiente e bordas arredondadas
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