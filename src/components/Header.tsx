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
  {/* Fundo branco, sombra leve, borda inferior cinza clara
      fixado no topo da página (sticky), com alta prioridade de empilhamento (z-index) */}
  <div className="px-4 lg:px-8 py-4">
    {/* Padding horizontal padrão (4) e maior em telas grandes (8),
        padding vertical (4) para espaçamento interno */}
    <div className="flex items-center justify-between">
      {/* Layout flexível com alinhamento vertical centralizado
          e espaçamento entre os lados (logo/menu e navegação/pesquisa) */}
      <div className="flex items-center gap-4">
        {/* Agrupamento do botão de menu e logo com espaçamento entre eles */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {/* Botão visível apenas em telas menores que 'lg',
              com padding, fundo cinza claro ao hover, cantos arredondados e transição suave */}
          <Menu className="w-6 h-6 text-gray-600" />
          {/* Ícone de menu com tamanho 6x6 e cor cinza média */}
        </button>

        <div className="flex items-center gap-2">
          {/* Logo com ícone e título lado a lado, com espaçamento entre eles */}
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            {/* Ícone com fundo gradiente azul-roxo, tamanho fixo, centralizado e com cantos arredondados */}
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Sape</h1>
          {/* Título com tamanho grande, negrito e cor escura */}
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-2">
        {/* Navegação oculta em telas pequenas, visível a partir de 'md',
            com layout flexível e espaçamento entre botões */}
        <button
          onClick={() => onViewChange('notes')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeView === 'notes'
              ? 'bg-blue-100 text-blue-700 shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {/* Botão de navegação com padding, cantos arredondados, fonte média e transição suave.
              Estilo muda conforme a aba ativa: fundo azul claro e texto azul escuro com sombra leve */}
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
        {/* Área de busca com layout flexível e espaçamento entre elementos */}
        <div className="relative hidden sm:block">
          {/* Campo de busca visível apenas em telas médias ou maiores,
              com posicionamento relativo para posicionar o ícone */}
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {/* Ícone de busca posicionado à esquerda e centralizado verticalmente,
              com cor cinza clara */}
          <input
            type="text"
            placeholder="Buscar anotações..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64"
            // Campo de texto com padding interno para acomodar o ícone,
            // borda cinza clara, cantos arredondados, efeito de foco com anel azul,
            // transição suave e largura fixa
          />
        </div>
      </div>
    </div>
  </div>
</header>
  );
}