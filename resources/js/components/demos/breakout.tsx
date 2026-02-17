import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const COLS = 10;
const ROWS = 6;
const BRICK_W = 52;
const BRICK_H = 22;
const PADDLE_W = 80;
const PADDLE_H = 14;
const BALL_R = 8;
const ARENA_W = COLS * BRICK_W + (COLS + 1) * 4;
const ARENA_H = 320;
const PADDLE_Y = ARENA_H - 40;
const BALL_SPEED = 4;
const POINTS_PER_BRICK = 10;

type Brick = { x: number; y: number; id: number };

function createBricks(): Brick[] {
    const bricks: Brick[] = [];
    let id = 0;
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            bricks.push({
                id: id++,
                x: 4 + col * (BRICK_W + 4),
                y: 4 + row * (BRICK_H + 4),
            });
        }
    }
    return bricks;
}

function hitTestBrick(bx: number, by: number, brick: Brick): boolean {
    return (
        bx + BALL_R > brick.x &&
        bx - BALL_R < brick.x + BRICK_W &&
        by + BALL_R > brick.y &&
        by - BALL_R < brick.y + BRICK_H
    );
}

function hitTestPaddle(px: number, py: number, bx: number, by: number): boolean {
    return (
        bx + BALL_R > px &&
        bx - BALL_R < px + PADDLE_W &&
        by + BALL_R > py &&
        by - BALL_R < py + PADDLE_H
    );
}

const BRICK_COLORS = [
    'bg-red-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-sky-500',
    'bg-violet-500',
    'bg-rose-500',
];

export function BreakoutDemo() {
    const [bricks, setBricks] = useState(createBricks);
    const [paddleX, setPaddleX] = useState((ARENA_W - PADDLE_W) / 2);
    const [ball, setBall] = useState({ x: ARENA_W / 2 - BALL_R, y: PADDLE_Y - BALL_R * 2, dx: BALL_SPEED * 0.7, dy: -BALL_SPEED });
    const [score, setScore] = useState(0);
    const [showPlusTen, setShowPlusTen] = useState(false);
    const [gameOver, setGameOver] = useState<'win' | 'lose' | null>(null);
    const [started, setStarted] = useState(false);
    const arenaRef = useRef<HTMLDivElement>(null);
    const ballRef = useRef(ball);
    const paddleXRef = useRef(paddleX);
    const bricksRef = useRef(bricks);
    ballRef.current = ball;
    paddleXRef.current = paddleX;
    bricksRef.current = bricks;

    const reset = useCallback(() => {
        setBricks(createBricks());
        setPaddleX((ARENA_W - PADDLE_W) / 2);
        setBall({
            x: ARENA_W / 2 - BALL_R,
            y: PADDLE_Y - BALL_R * 2,
            dx: BALL_SPEED * 0.7,
            dy: -BALL_SPEED,
        });
        setScore(0);
        setShowPlusTen(false);
        setGameOver(null);
        setStarted(false);
    }, []);

    useEffect(() => {
        if (gameOver || !started) return;

        let raf = 0;
        const tick = () => {
            const { x, y, dx, dy } = ballRef.current;
            let nx = x + dx;
            let ny = y + dy;
            let ndx = dx;
            let ndy = dy;

            if (nx - BALL_R <= 0 || nx + BALL_R >= ARENA_W) ndx = -dx;
            if (ny - BALL_R <= 0) ndy = -dy;

            const px = paddleXRef.current;
            if (hitTestPaddle(px, PADDLE_Y, nx, ny)) {
                ndy = -Math.abs(dy);
                const hitPos = (nx - (px + PADDLE_W / 2)) / (PADDLE_W / 2);
                ndx = BALL_SPEED * 0.9 * Math.max(-1, Math.min(1, hitPos));
            }

            const currentBricks = bricksRef.current;
            const hitBrick = currentBricks.find((b) => hitTestBrick(nx, ny, b));
            if (hitBrick) {
                setScore((s) => s + POINTS_PER_BRICK);
                setShowPlusTen(true);
                ndy = -dy;
                setBricks((prev) => prev.filter((b) => b.id !== hitBrick.id));
            }

            if (ny + BALL_R > ARENA_H) {
                setGameOver('lose');
                return;
            }

            setBall({ x: nx, y: ny, dx: ndx, dy: ndy });
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [gameOver, started]);

    useEffect(() => {
        if (!showPlusTen) return;
        const t = setTimeout(() => setShowPlusTen(false), 400);
        return () => clearTimeout(t);
    }, [showPlusTen]);

    useEffect(() => {
        if (bricks.length === 0 && started && !gameOver) setGameOver('win');
    }, [bricks.length, started, gameOver]);

    useEffect(() => {
        const el = arenaRef.current;
        if (!el) return;
        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setPaddleX(Math.max(0, Math.min(ARENA_W - PADDLE_W, x - PADDLE_W / 2)));
        };
        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!started && !gameOver && e.key === ' ') {
                e.preventDefault();
                setStarted(true);
            }
            if (gameOver) return;
            const step = 24;
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setPaddleX((x) => Math.max(0, x - step));
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                setPaddleX((x) => Math.min(ARENA_W - PADDLE_W, x + step));
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [started, gameOver]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 p-6">
            <div className="flex items-center justify-between gap-4 text-sm text-neutral-300 w-full max-w-[600px]">
                <span className="font-medium tabular-nums">Score: {score}</span>
                {showPlusTen && <span className="text-amber-400 font-semibold">+{POINTS_PER_BRICK}</span>}
                {!started && !gameOver && (
                    <span className="text-amber-400">Move mouse or arrows · Press Space to launch</span>
                )}
                {gameOver === 'win' && <span className="text-emerald-400">You win!</span>}
                {gameOver === 'lose' && <span className="text-red-400">Game over</span>}
                <button
                    type="button"
                    onClick={reset}
                    className="rounded bg-neutral-700 px-3 py-1.5 text-white hover:bg-neutral-600"
                >
                    Restart
                </button>
            </div>
            <div
                ref={arenaRef}
                className="relative border-2 border-neutral-600 bg-neutral-800"
                style={{ width: ARENA_W, height: ARENA_H }}
            >
                {bricks.map((brick, i) => (
                    <div
                        key={brick.id}
                        className={cn(
                            'absolute border-0',
                            BRICK_COLORS[Math.floor(brick.y / (BRICK_H + 4)) % BRICK_COLORS.length],
                        )}
                        style={{
                            left: brick.x,
                            top: brick.y,
                            width: BRICK_W,
                            height: BRICK_H,
                        }}
                    />
                ))}
                <div
                    className="absolute bg-neutral-400 border-0"
                    style={{
                        left: paddleX,
                        top: PADDLE_Y,
                        width: PADDLE_W,
                        height: PADDLE_H,
                    }}
                />
                <div
                    className="absolute rounded-full bg-white border-0"
                    style={{
                        left: ball.x - BALL_R,
                        top: ball.y - BALL_R,
                        width: BALL_R * 2,
                        height: BALL_R * 2,
                    }}
                />
            </div>
        </div>
    );
}
