import { useMemo } from 'react';
import * as THREE from 'three';

const COUNT = 1200;
const TRACK_HALF_WIDTH = 10; // match Track.tsx – no stars in |X| <= this
const SKY_FLOOR = 4; // no stars on track (Y < this only allowed when |X| > TRACK_HALF_WIDTH)
// Horizon dead zone: no star in center strip (would appear on track)
const CENTER_DEAD_ZONE_X = 14; // |X| must be > this when Y is near horizon
const HORIZON_ZONE_Y = 10; // below this Y, sky stars must be outside center

export default function Starfield() {
    const positions = useMemo(() => {
        const pos = new Float32Array(COUNT * 3);
        let i = 0;
        while (i < COUNT) {
            const z = (Math.random() - 0.5) * -120 - 40;
            const r = Math.random();
            let x: number;
            let y: number;
            if (r < 0.6) {
                // Sky: above track; near horizon (Y < HORIZON_ZONE_Y) keep |X| > CENTER_DEAD_ZONE_X
                y = Math.random() * (120 - SKY_FLOOR) + SKY_FLOOR;
                if (y < HORIZON_ZONE_Y) {
                    const side = Math.random() < 0.5 ? -1 : 1;
                    x = side * (CENTER_DEAD_ZONE_X + Math.random() * (90 - CENTER_DEAD_ZONE_X));
                } else {
                    x = (Math.random() - 0.5) * 180;
                }
            } else if (r < 0.8) {
                x = -TRACK_HALF_WIDTH - Math.random() * (90 - TRACK_HALF_WIDTH);
                y = Math.random() * (SKY_FLOOR + 24) - 20;
            } else {
                x = TRACK_HALF_WIDTH + Math.random() * (90 - TRACK_HALF_WIDTH);
                y = Math.random() * (SKY_FLOOR + 24) - 20;
            }
            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
            i++;
        }
        return pos;
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={COUNT}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.2}
                color="#e8f4ff"
                transparent
                opacity={0.9}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                fog={false}
            />
        </points>
    );
}
