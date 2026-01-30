import { createContext, useContext, useRef, useState, ReactNode, useCallback } from 'react';
import { Vector3 } from 'three';

interface GameContextType {
    playerPosition: React.MutableRefObject<Vector3>;
    isGameStarted: boolean;
    isGameOver: boolean;
    isBoosting: boolean;
    score: number;
    level: number;
    gatesCollected: number;
    gatesNeeded: number;
    showLevelUp: boolean;
    gatePopup: string | null;
    waveHint: string | null;
    volume: number;
    setVolume: (volume: number) => void;
    startGame: () => void;
    setBoosting: (boosting: boolean) => void;
    triggerExplosion: (position: Vector3) => void;
    restartGame: () => void;
    incrementScore: () => void;
    collectGate: () => void;
    explosionPosition: Vector3 | null;
}

const GameContext = createContext<GameContextType | null>(null);

// Gates needed increases each level
const getGatesForLevel = (level: number) => {
    if (level === 1) return 3;
    if (level === 2) return 4;
    return 5; // Level 3+
};

export function GameProvider({ children }: { children: ReactNode }) {
    const playerPosition = useRef(new Vector3(0, 0.5, 0));
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isBoosting, setIsBoosting] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [gatesCollected, setGatesCollected] = useState(0);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [gatePopup, setGatePopup] = useState<string | null>(null);
    const [waveHint, setWaveHint] = useState<string | null>(null);
    const [explosionPosition, setExplosionPosition] = useState<Vector3 | null>(null);
    const [volume, setVolume] = useState(0.1); // Default 10%

    const startGame = useCallback(() => {
        setIsGameStarted(true);
        setWaveHint('Hold up to boost!');
        setTimeout(() => setWaveHint(null), 3000);
    }, []);

    const setBoosting = useCallback((boosting: boolean) => {
        setIsBoosting(boosting);
    }, []);

    const triggerExplosion = useCallback((position: Vector3) => {
        if (!isGameOver) {
            setExplosionPosition(position.clone());
            setIsGameOver(true);
        }
    }, [isGameOver]);

    const restartGame = useCallback(() => {
        setIsGameOver(false);
        setIsGameStarted(true);
        setScore(0);
        setLevel(1);
        setGatesCollected(0);
        setShowLevelUp(false);
        setWaveHint('Hold up to boost!');
        setTimeout(() => setWaveHint(null), 3000);
        setExplosionPosition(null);
        playerPosition.current.set(0, 0.5, 0);
    }, []);

    const incrementScore = useCallback(() => {
        setScore((prev) => prev + 10 * level);
    }, [level]);

    const collectGate = useCallback(() => {
        const gatesNeeded = getGatesForLevel(level);
        setGatesCollected((prev) => {
            const newCount = prev + 1;
            
            // Show popup
            setGatePopup(`${newCount}/${gatesNeeded}`);
            setTimeout(() => setGatePopup(null), 1000);
            
            if (newCount >= gatesNeeded) {
                // Level up!
                setShowLevelUp(true);
                setLevel((l) => {
                    const next = l + 1;
                    const hints: Record<number, string> = {
                        2: 'Press space to jump!',
                    };
                    if (hints[next]) {
                        setWaveHint(hints[next]);
                        setTimeout(() => setWaveHint(null), 3000);
                    }
                    return next;
                });
                // Hide level up message after 2 seconds
                setTimeout(() => setShowLevelUp(false), 2000);
                return 0; // Reset gates for next level
            }
            return newCount;
        });
        // Bonus points for collecting gate
        setScore((prev) => prev + 50 * level);
    }, [level]);

    return (
        <GameContext.Provider
            value={{
                playerPosition,
                isGameStarted,
                isGameOver,
                isBoosting,
                score,
                level,
                gatesCollected,
                gatesNeeded: getGatesForLevel(level),
                showLevelUp,
                gatePopup,
                waveHint,
                volume,
                setVolume,
                startGame,
                setBoosting,
                triggerExplosion,
                restartGame,
                incrementScore,
                collectGate,
                explosionPosition,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
