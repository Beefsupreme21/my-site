import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LampContainer } from '@/components/ui/lamp';

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

interface Card {
  id: string;
  text: string;
}

interface Column {
  id: string;
  title: string;
}

const INITIAL_COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

const INITIAL_CARDS: Record<string, Card[]> = {
  todo: [
    { id: '1', text: 'Review pull requests' },
    { id: '2', text: 'Update documentation' },
    { id: '3', text: 'Plan sprint' },
  ],
  'in-progress': [
    { id: '4', text: 'Fix login bug' },
    { id: '5', text: 'Design dashboard' },
  ],
  done: [
    { id: '6', text: 'Deploy to staging' },
    { id: '7', text: 'Write tests' },
  ],
};

const COLUMN_ACCENT: Record<string, string> = {
  todo: 'border-t-amber-500/70',
  'in-progress': 'border-t-purple-500/70',
  done: 'border-t-emerald-500/70',
};

export function KanbanDemo() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [cardsByColumn, setCardsByColumn] = useState<Record<string, Card[]>>(INITIAL_CARDS);
  const [addingCardColumnId, setAddingCardColumnId] = useState<string | null>(null);
  const [newCardText, setNewCardText] = useState('');
  const [addingList, setAddingList] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const cardInputRef = useRef<HTMLTextAreaElement>(null);
  const listInputRef = useRef<HTMLInputElement>(null);
  const [draggedCard, setDraggedCard] = useState<{ card: Card; columnId: string } | null>(null);
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editingColumnTitle, setEditingColumnTitle] = useState('');
  const [editingCard, setEditingCard] = useState<{ cardId: string; columnId: string } | null>(null);
  const [editingCardText, setEditingCardText] = useState('');
  const cardEditRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (addingCardColumnId) cardInputRef.current?.focus();
  }, [addingCardColumnId]);

  useEffect(() => {
    if (addingList) listInputRef.current?.focus();
  }, [addingList]);

  useEffect(() => {
    if (editingCard) cardEditRef.current?.focus();
  }, [editingCard]);

  const addCardToColumn = useCallback((columnId: string) => {
    const text = newCardText.trim();
    if (!text) return;
    const card: Card = { id: generateId(), text };
    setCardsByColumn((prev) => ({
      ...prev,
      [columnId]: [card, ...(prev[columnId] ?? [])],
    }));
    setNewCardText('');
    setAddingCardColumnId(null);
  }, [newCardText]);

  const addColumn = useCallback(() => {
    const title = newColumnTitle.trim() || 'New list';
    const id = generateId();
    setColumns((prev) => [...prev, { id, title }]);
    setCardsByColumn((prev) => ({ ...prev, [id]: [] }));
    setNewColumnTitle('');
    setAddingList(false);
  }, [newColumnTitle]);

  const removeColumn = useCallback((columnId: string) => {
    setColumns((prev) => prev.filter((c) => c.id !== columnId));
    setCardsByColumn((prev) => {
      const next = { ...prev };
      delete next[columnId];
      return next;
    });
    if (addingCardColumnId === columnId) setAddingCardColumnId(null);
  }, [addingCardColumnId]);

  const updateColumnTitle = useCallback((columnId: string, title: string) => {
    setColumns((prev) =>
      prev.map((c) => (c.id === columnId ? { ...c, title: title.trim() || c.title } : c)),
    );
    setEditingColumnId(null);
    setEditingColumnTitle('');
  }, []);

  const startEditingColumn = (col: Column) => {
    setEditingColumnId(col.id);
    setEditingColumnTitle(col.title);
  };

  const startEditingCard = (card: Card, columnId: string) => {
    setEditingCard({ cardId: card.id, columnId });
    setEditingCardText(card.text);
  };

  const updateCard = useCallback((columnId: string, cardId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setCardsByColumn((prev) => ({
      ...prev,
      [columnId]: (prev[columnId] ?? []).map((c) =>
        c.id === cardId ? { ...c, text: trimmed } : c,
      ),
    }));
    setEditingCard(null);
    setEditingCardText('');
  }, []);

  const moveCard = useCallback((card: Card, fromColumnId: string, toColumnId: string) => {
    if (fromColumnId === toColumnId) return;
    setCardsByColumn((prev) => ({
      ...prev,
      [fromColumnId]: (prev[fromColumnId] ?? []).filter((c) => c.id !== card.id),
      [toColumnId]: [...(prev[toColumnId] ?? []), card],
    }));
  }, []);

  const handleDragStart = (card: Card, columnId: string) => {
    setDraggedCard({ card, columnId });
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    if (draggedCard) {
      moveCard(draggedCard.card, draggedCard.columnId, toColumnId);
      setDraggedCard(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 p-6 pt-12 md:p-8 md:pt-16">
      <header className="mb-8">
        <LampContainer className="py-6 md:py-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Kanban
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Drag cards between lists · Click the pencil icon to edit
          </p>
        </LampContainer>
      </header>
      <div className="flex flex-1 gap-5 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className={cn(
              'flex min-w-[272px] max-w-[272px] flex-shrink-0 flex-col rounded-xl border border-neutral-700/80 bg-neutral-900/80 p-4 shadow-lg transition-colors',
              'border-t-4',
              COLUMN_ACCENT[col.id] ?? 'border-t-neutral-600',
              draggedCard && 'border-neutral-600',
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              {editingColumnId === col.id ? (
                <form
                  className="min-w-0 flex-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateColumnTitle(col.id, editingColumnTitle);
                  }}
                >
                  <input
                    type="text"
                    value={editingColumnTitle}
                    onChange={(e) => setEditingColumnTitle(e.target.value)}
                    onBlur={() => updateColumnTitle(col.id, editingColumnTitle)}
                    className="w-full rounded border border-neutral-600 bg-neutral-800 px-2 py-1 text-sm font-semibold text-neutral-200 focus:border-purple-500 focus:outline-none"
                    autoFocus
                  />
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => startEditingColumn(col)}
                  className="min-w-0 flex-1 truncate text-left text-sm font-semibold uppercase tracking-wide text-neutral-200 hover:text-white"
                >
                  {col.title}
                </button>
              )}
              <button
                type="button"
                onClick={() => removeColumn(col.id)}
                disabled={columns.length <= 1}
                className="rounded p-1 text-neutral-500 transition-colors hover:bg-neutral-700 hover:text-red-400 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-neutral-500"
                title={columns.length <= 1 ? 'Keep at least one list' : 'Remove list'}
                aria-label="Remove list"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex min-h-[80px] flex-1 flex-col gap-2 overflow-y-auto">
              {(cardsByColumn[col.id] ?? []).map((card) => (
                <div key={card.id}>
                  {editingCard?.cardId === card.id && editingCard?.columnId === col.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        updateCard(col.id, card.id, editingCardText);
                      }}
                      className="space-y-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <textarea
                        ref={cardEditRef}
                        value={editingCardText}
                        onChange={(e) => setEditingCardText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            updateCard(col.id, card.id, editingCardText);
                          }
                          if (e.key === 'Escape') {
                            setEditingCard(null);
                            setEditingCardText('');
                          }
                        }}
                        rows={2}
                        className="w-full resize-none rounded-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        autoComplete="off"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-500"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCard(null);
                            setEditingCardText('');
                          }}
                          className="text-sm text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div
                      draggable
                      onDragStart={() => handleDragStart(card, col.id)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        'group flex cursor-grab items-start justify-between gap-2 rounded-lg border border-neutral-700/80 bg-neutral-800/90 px-3.5 py-2.5 text-sm text-neutral-100 shadow-md transition-all hover:border-neutral-600 hover:bg-neutral-700/90 active:cursor-grabbing',
                        draggedCard?.card.id === card.id && 'opacity-50',
                      )}
                    >
                      <span className="min-w-0 flex-1 truncate">{card.text}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditingCard(card, col.id);
                        }}
                        className="flex-shrink-0 rounded p-1 text-neutral-500 transition-colors hover:bg-neutral-600 hover:text-neutral-300"
                        title="Edit card"
                        aria-label="Edit card"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add a card - Trello style */}
            <div className="mt-2">
              {addingCardColumnId === col.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addCardToColumn(col.id);
                  }}
                  className="space-y-2"
                >
                  <textarea
                    ref={cardInputRef}
                    value={newCardText}
                    onChange={(e) => setNewCardText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        addCardToColumn(col.id);
                      }
                    }}
                    placeholder="Enter a title for this card..."
                    rows={2}
                    className="w-full resize-none rounded-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    autoComplete="off"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-500"
                    >
                      Add card
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingCardColumnId(null);
                        setNewCardText('');
                      }}
                      className="text-sm text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setNewCardText('');
                    setAddingCardColumnId(col.id);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg border border-dashed border-neutral-600/80 px-3 py-2.5 text-left text-sm text-neutral-500 transition-colors hover:border-neutral-500 hover:bg-neutral-800/50 hover:text-neutral-300"
                >
                  <span className="text-lg leading-none">+</span>
                  Add a card
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add another list - Trello style */}
        <div className="min-w-[260px] max-w-[260px] flex-shrink-0">
          {addingList ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addColumn();
              }}
              className="rounded-lg border-2 border-neutral-700 bg-neutral-800/80 p-3"
            >
              <input
                ref={listInputRef}
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                onBlur={() => {
                  if (!newColumnTitle.trim()) setAddingList(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setAddingList(false);
                    setNewColumnTitle('');
                  }
                }}
                placeholder="Enter list title..."
                className="mb-2 w-full rounded border border-neutral-600 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none"
                autoComplete="off"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-500"
                >
                  Add list
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddingList(false);
                    setNewColumnTitle('');
                  }}
                  className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                  aria-label="Cancel"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setAddingList(true)}
              className="flex min-h-[100px] w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-900/50 px-4 py-4 text-sm text-neutral-500 transition-colors hover:border-neutral-600 hover:bg-neutral-800/60 hover:text-neutral-300"
            >
              <span className="text-lg leading-none">+</span>
              Add another list
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
