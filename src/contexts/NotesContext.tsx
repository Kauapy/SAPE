import React, { createContext, useContext, useState, useEffect } from 'react';
import { Note } from '../types/Note';

interface NotesContextType {
  notes: Note[];
  categories: string[];
  selectedCategory: string | null;
  searchTerm: string;
  filteredNotes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchTerm: (term: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('eduStudyNotes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
      setNotes(parsedNotes);
    } else {
      // Add sample notes if none exist
      const sampleNotes: Note[] = [
        {
          id: '1',
          title: 'Conceitos Básicos de Matemática',
          content: 'Álgebra básica:\n• Equações de primeiro grau\n• Sistemas lineares\n• Funções\n\nGeometria:\n• Teorema de Pitágoras\n• Áreas e volumes\n• Trigonometria básica',
          category: 'Matemática',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: '2',
          title: 'Revolução Industrial',
          content: 'A Revolução Industrial foi um período de grandes transformações nos métodos de produção que teve início na Inglaterra no século XVIII.\n\n**Principais características:**\n• Mecanização da produção\n• Êxodo rural\n• Surgimento da classe operária\n• Desenvolvimento das ferrovias',
          category: 'História',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
          id: '3',
          title: 'Gramática - Classes de Palavras',
          content: 'Substantivo: palavra que nomeia seres, objetos, sentimentos, lugares, etc.\n\nAdjetivo: palavra que caracteriza o substantivo.\n\nVerbo: palavra que indica ação, estado ou fenômeno.\n\nAdvérbio: palavra que modifica o verbo, adjetivo ou outro advérbio.',
          category: 'Português',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setNotes(sampleNotes);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('eduStudyNotes', JSON.stringify(notes));
  }, [notes]);

  const categories = [...new Set(notes.map(note => note.category))];

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory ? note.category === selectedCategory : true;
    const matchesSearch = searchTerm ? 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{
      notes,
      categories,
      selectedCategory,
      searchTerm,
      filteredNotes,
      addNote,
      updateNote,
      deleteNote,
      setSelectedCategory,
      setSearchTerm,
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}