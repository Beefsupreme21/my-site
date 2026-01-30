import { Canvas } from '@react-three/fiber';
import { GameProvider } from '@/components/demos/neon-racer/GameContext';
import Scene from '@/components/demos/neon-racer/Scene';
import GameOverlay from '@/components/demos/neon-racer/GameOverlay';
import Music from '@/components/demos/neon-racer/Music';

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
