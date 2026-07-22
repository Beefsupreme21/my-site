import { Canvas } from '@react-three/fiber';
import { GameProvider } from '@/components/demos/neon-racer/GameContext';
import GameOverlay from '@/components/demos/neon-racer/GameOverlay';
import Music from '@/components/demos/neon-racer/Music';
import Scene from '@/components/demos/neon-racer/Scene';

export function ThreeJSGameDemo() {
    return (
        <div className="relative h-screen w-full bg-black">
            <GameProvider>
                <Canvas camera={{ position: [0, 10, 18], fov: 60 }}>
                    <Scene />
                </Canvas>
                <GameOverlay />
                <Music />
            </GameProvider>
        </div>
    );
}
