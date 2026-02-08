import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

const WORD_LIST = [
  'APPLE', 'BLACK', 'CHIME', 'DANCE', 'EARTH', 'FLAME', 'GRAPE', 'HEART', 'IVORY', 'JEWEL',
  'KNIFE', 'LEMON', 'MAGIC', 'NORTH', 'OCEAN', 'PIANO', 'QUICK', 'RIVER', 'STONE', 'TRUCK',
  'ULTRA', 'VIVID', 'WATER', 'YOUTH', 'ZEBRA', 'BEACH', 'CLOUD', 'DOUBT', 'EMBER', 'FOCUS',
];

function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

type CellStatus = 'correct' | 'present' | 'absent' | null;

function getFeedback(guess: string, answer: string): CellStatus[] {
  const answerCounts = new Map<string, number>();
  for (const c of answer) {
    answerCounts.set(c, (answerCounts.get(c) ?? 0) + 1);
  }
  const statuses: CellStatus[] = ['absent', 'absent', 'absent', 'absent', 'absent'];
  const used = new Map<string, number>();

  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      statuses[i] = 'correct';
      used.set(guess[i], (used.get(guess[i]) ?? 0) + 1);
    }
  }
  for (let i = 0; i < 5; i++) {
    if (statuses[i] === 'correct') continue;
    const count = used.get(guess[i]) ?? 0;
    const max = answerCounts.get(guess[i]) ?? 0;
    if (count < max) {
      statuses[i] = 'present';
      used.set(guess[i], count + 1);
    }
  }
  return statuses;
}

const ROWS = 6;
const COLS = 5;

const KEYBOARD_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

function getLetterStatuses(guesses: string[], answer: string): Record<string, CellStatus> {
  const best: Record<string, CellStatus> = {};
  for (const guess of guesses) {
    const feedback = getFeedback(guess, answer);
    for (let i = 0; i < 5; i++) {
      const letter = guess[i];
      const status = feedback[i];
      if (!status) continue;
      const existing = best[letter];
      if (!existing || status === 'correct') best[letter] = status;
      else if (status === 'present' && existing !== 'correct') best[letter] = 'present';
      else if (status === 'absent' && !existing) best[letter] = 'absent';
    }
  }
  return best;
}

export function WordleDemo() {
  const [answer, setAnswer] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState<'win' | 'lose' | null>(null);
  const letterStatuses = getLetterStatuses(guesses, answer);

  const submitGuess = useCallback(() => {
    const guess = currentGuess.toUpperCase().trim();
    if (guess.length !== 5) return;
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setCurrentGuess('');
    if (guess === answer) setGameOver('win');
    else if (newGuesses.length >= ROWS) setGameOver('lose');
  }, [currentGuess, guesses, answer]);

  const reset = useCallback(() => {
    setAnswer(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(null);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitGuess();
        return;
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        setCurrentGuess((g) => g.slice(0, -1));
        return;
      }
      if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        setCurrentGuess((g) => (g.length < COLS ? g + e.key.toUpperCase() : g));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, submitGuess]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 pt-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-2xl font-bold text-white">Wordle</h1>
        <p className="mb-6 text-center text-sm text-neutral-400">
          Guess the 5-letter word in 6 tries. Type 5 letters then press <kbd className="rounded bg-neutral-700 px-1.5 py-0.5 text-xs">Enter</kbd> to submit.
        </p>

        <div className="mb-6 grid gap-1.5">
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1.5">
              {Array.from({ length: COLS }).map((_, colIndex) => {
                const isCurrentRow = rowIndex === guesses.length;
                const letter = isCurrentRow
                  ? currentGuess[colIndex] ?? ''
                  : guesses[rowIndex]?.[colIndex] ?? '';
                const feedback =
                  rowIndex < guesses.length
                    ? getFeedback(guesses[rowIndex], answer)[colIndex]
                    : null;
                return (
                  <div
                    key={colIndex}
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-bold uppercase transition-colors',
                      feedback === 'correct' && 'border-green-600 bg-green-600 text-white',
                      feedback === 'present' && 'border-amber-500 bg-amber-500 text-white',
                      feedback === 'absent' && 'border-neutral-600 bg-neutral-700 text-neutral-400',
                      !feedback && isCurrentRow && letter && 'border-neutral-500 bg-neutral-800 text-white',
                      !feedback && (!isCurrentRow || !letter) && 'border-neutral-700 bg-neutral-900 text-neutral-500',
                    )}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col items-center gap-1.5">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {rowIndex === 2 && (
                <button
                  type="button"
                  onClick={submitGuess}
                  className="flex h-9 min-w-[2.25rem] items-center justify-center rounded bg-neutral-600 px-2 text-xs font-medium text-white hover:bg-neutral-500"
                >
                  Enter
                </button>
              )}
              {row.split('').map((key) => {
                const status = letterStatuses[key] ?? null;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      if (gameOver) return;
                      if (currentGuess.length < COLS) {
                        setCurrentGuess((g) => g + key);
                      }
                    }}
                    className={cn(
                      'flex h-9 w-8 items-center justify-center rounded text-sm font-bold uppercase transition-colors sm:w-9',
                      status === 'correct' && 'bg-green-600 text-white',
                      status === 'present' && 'bg-amber-500 text-white',
                      status === 'absent' && 'bg-neutral-700 text-neutral-400',
                      !status && 'bg-neutral-600 text-white hover:bg-neutral-500',
                    )}
                  >
                    {key}
                  </button>
                );
              })}
              {rowIndex === 2 && (
                <button
                  type="button"
                  onClick={() => setCurrentGuess((g) => g.slice(0, -1))}
                  className="flex h-9 min-w-[2.25rem] items-center justify-center rounded bg-neutral-600 px-2 text-xs font-medium text-white hover:bg-neutral-500"
                >
                  ⌫
                </button>
              )}
            </div>
          ))}
        </div>

        {gameOver === 'win' && (
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold text-green-400">You got it!</p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500"
            >
              Play again
            </button>
          </div>
        )}
        {gameOver === 'lose' && (
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold text-neutral-300">The word was</p>
            <p className="text-xl font-bold uppercase text-white">{answer}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500"
            >
              Play again
            </button>
          </div>
        )}

        <p className="text-center text-xs text-neutral-500">
          Green = right spot, yellow = wrong spot, gray = not in word. Answers rotate from {WORD_LIST.length} words each game.
        </p>
      </div>
    </div>
  );
}
