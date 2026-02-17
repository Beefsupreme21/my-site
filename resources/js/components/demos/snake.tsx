import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const COLS = 17;
const ROWS = 15;
const INITIAL_TICK_MS = 220;
const MIN_TICK_MS = 65;
const SPEED_UP_PER_FOOD_MS = 12;
const POINTS_PER_FOOD = 10;

type Dir = 'up' | 'down' | 'left' | 'right';

function randomCell(): { x: number; y: number } {
    return {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
    };
}

function newFood(snake: { x: number; y: number }[]): { x: number; y: number } {
    let f = randomCell();
    while (snake.some((s) => s.x === f.x && s.y === f.y)) {
        f = randomCell();
    }
    return f;
}

export function SnakeDemo() {
    const [snake, setSnake] = useState<{ x: number; y: number }[]>([
        { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) },
    ]);
    const [dir, setDir] = useState<Dir>('right');
    const [food, setFood] = useState(() => newFood([{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }]));
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [tickMs, setTickMs] = useState(INITIAL_TICK_MS);
    const [showPlusTen, setShowPlusTen] = useState(false);
    const [started, setStarted] = useState(false);
    const nextDirRef = useRef<Dir>('right');
    const foodRef = useRef(food);
    foodRef.current = food;

    const reset = useCallback(() => {
        const head = { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) };
        setSnake([head]);
        setFood(newFood([head]));
        setDir('right');
        nextDirRef.current = 'right';
        setGameOver(false);
        setScore(0);
        setTickMs(INITIAL_TICK_MS);
        setShowPlusTen(false);
        setStarted(false);
    }, []);

    useEffect(() => {
        if (gameOver || !started) return;

        const id = setInterval(() => {
            const currentDir = nextDirRef.current;
            const currentFood = foodRef.current;
            setDir(currentDir);

            setSnake((prev) => {
                const head = prev[0];
                let nx = head.x;
                let ny = head.y;
                switch (currentDir) {
                    case 'up':
                        ny -= 1;
                        break;
                    case 'down':
                        ny += 1;
                        break;
                    case 'left':
                        nx -= 1;
                        break;
                    case 'right':
                        nx += 1;
                        break;
                }

                if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) {
                    setGameOver(true);
                    return prev;
                }
                if (prev.some((s) => s.x === nx && s.y === ny)) {
                    setGameOver(true);
                    return prev;
                }

                const ateFood = currentFood.x === nx && currentFood.y === ny;
                if (ateFood) {
                    setScore((s) => s + POINTS_PER_FOOD);
                    setTickMs((t) => Math.max(MIN_TICK_MS, t - SPEED_UP_PER_FOOD_MS));
                    setShowPlusTen(true);
                    const grown = [{ x: nx, y: ny }, ...prev];
                    setFood(newFood(grown));
                    return grown;
                }
                return [{ x: nx, y: ny }, ...prev.slice(0, -1)];
            });
        }, tickMs);
        return () => clearInterval(id);
    }, [gameOver, started, tickMs]);

    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            const key = e.key;
            if (!started && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                e.preventDefault();
                setStarted(true);
            }
            if (gameOver) return;
            e.preventDefault();
            const opposite: Record<Dir, Dir> = {
                up: 'down',
                down: 'up',
                left: 'right',
                right: 'left',
            };
            const current = nextDirRef.current;
            if (key === 'ArrowUp' && opposite[current] !== 'up') nextDirRef.current = 'up';
            if (key === 'ArrowDown' && opposite[current] !== 'down') nextDirRef.current = 'down';
            if (key === 'ArrowLeft' && opposite[current] !== 'left') nextDirRef.current = 'left';
            if (key === 'ArrowRight' && opposite[current] !== 'right') nextDirRef.current = 'right';
        };
        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [started, gameOver]);

    useEffect(() => {
        if (!showPlusTen) return;
        const t = setTimeout(() => setShowPlusTen(false), 500);
        return () => clearTimeout(t);
    }, [showPlusTen]);

    const isSnake = useCallback(
        (x: number, y: number) => snake.some((s) => s.x === x && s.y === y),
        [snake],
    );
    const isHead = useCallback((x: number, y: number) => snake[0]?.x === x && snake[0]?.y === y, [snake]);

    const cellSize = 20;
    const gap = 2;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-950 p-6">
            <div className="flex items-center justify-between gap-4 text-sm text-neutral-300">
                <span className="font-medium tabular-nums">Score: {score}</span>
                {showPlusTen && (
                    <span className="text-amber-400 font-semibold">+{POINTS_PER_FOOD}</span>
                )}
                {!started && !gameOver && (
                    <span className="text-amber-400">Press any arrow key to start</span>
                )}
                {gameOver && (
                    <span className="text-red-400">Game over — press Restart</span>
                )}
                <button
                    type="button"
                    onClick={reset}
                    className="rounded bg-neutral-700 px-3 py-1.5 text-white hover:bg-neutral-600"
                >
                    Restart
                </button>
            </div>
            <div
                className="inline-grid border-2 border-neutral-600 bg-neutral-800"
                style={{
                    gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${ROWS}, ${cellSize}px)`,
                    gap,
                    padding: gap,
                }}
            >
                {Array.from({ length: ROWS * COLS }, (_, i) => {
                    const x = i % COLS;
                    const y = Math.floor(i / COLS);
                    const snakeHere = isSnake(x, y);
                    const head = isHead(x, y);
                    const isFood = food.x === x && food.y === y;
                    return (
                        <div
                            key={`${x}-${y}`}
                            className={cn(
                                'border-0',
                                head && 'bg-emerald-500',
                                snakeHere && !head && 'bg-emerald-600',
                                isFood && 'bg-amber-400',
                                !snakeHere && !isFood && 'bg-neutral-700',
                            )}
                            style={{ width: cellSize, height: cellSize }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
